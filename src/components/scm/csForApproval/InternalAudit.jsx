import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { formateDate } from "../../../utils/formateDate";
import { useSelector } from "react-redux";
import {
  useMdApprovalMutation,
  useReworkPriceMutation,
} from "../../../redux/features/scm/priceComparison/mutationPriceComparison";
import CustomTable from "../../table/CustomTable";
import CustomTextInput from "../../inputs/CustomTextInput";
import SubmitButton from "../../buttons/SubmitButton";
import ReturnButton from "../../buttons/ReturnButton";
import {
  useGetIAViewQuery,
  useGetReportQuery,
  useLazyGetCsViewQuery,
} from "../../../redux/features/scm/priceComparison/queryPriceComparison";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { successToast } from "../../../common/toaster/toaster";
import CsViewModal from "./CsViewModal";
import { FaEye } from "react-icons/fa";
import ReportViewer from "../../report/ReportViewer";

const InternalAudit = ({ showMDApproval, showIARW }) => {
  const { user } = useSelector((state) => state.auth);

  const [remarks, setRemarks] = useState("");
  const [selectedRow, setSelectedRows] = useState([]);

  const [csId, setCsId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const {
    data: row,
    isLoading: isIALoading,
    refetch,
  } = useGetIAViewQuery(user?.userName);
  const [reworkPrice, { data, isSuccess, isLoading }] =
    useReworkPriceMutation();

  const [
    mdApproval,
    { data: mdData, isSuccess: isMDSuccess, isLoading: isMDLoading },
  ] = useMdApprovalMutation();

  const { data: reportData, refetch: refetchReport } = useGetReportQuery({
    id: csId,
    user: user?.userName,
  });
  //  Get Cs View Query
  const [
    csViewQuery,
    {
      data: viewData,
      isError: viewError,
      isSuccess: viewSuccess,
      isFetching: viewLoading,
    },
  ] = useLazyGetCsViewQuery();

  const handleReport = (row) => {
    setCsId(row?.pc_ref_no);
    if (reportData) {
      setReportDataView(null);
      refetchReport();
      // setModalOpen(false);
    }
    setModalOpen(true);
  };
  const handleView = (row) => {
    csViewQuery(row?.pc_ref_no);
    setViewModalOpen(true);
  };
  useEffect(() => {
    if (viewError) {
      errorToast("Something Went Wrong");
      setViewModalOpen(false);
    }
  }, [viewError]);
  useEffect(() => {
    if (reportData) {
      // setModalOpen(true);
      setReportDataView(reportData);
    }
  }, [reportData]);

  const columns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      align: "center",
      headerAlign: "center",
      renderCell: (row) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <span
              onClick={() => handleReport(row?.row)}
              style={{ color: "#1976d2", cursor: "pointer" }}
            >
              Report <BsFileEarmarkPdf color="red" />
            </span>
            <span
              onClick={() => handleView(row?.row)}
              style={{
                color: "#1976d2",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              view <FaEye color="#1976d2" />
            </span>
          </Box>
        );
      },
      minWidth: 120,
      flex: 1,
    },
    { field: "pc_ref_no", headerName: "CS.No#", minWidth: 65, flex: 1 },
    { field: "cBuyer_Name", headerName: "Buyer", minWidth: 100, flex: 1 },
    { field: "cStyleNo", headerName: "Style", minWidth: 200, flex: 1 },
    { field: "ordt_desc", headerName: "Order Type", minWidth: 80, flex: 1 },
    {
      field: "dOOshtRec",
      headerName: "Order Placement Date",
      valueGetter: (params) => formateDate(params.value),

      minWidth: 140,
      flex: 1,
    },
    {
      field: "cMainCategory",
      headerName: "Main Category",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "order_qty",
      headerName: "Item Order Qty",
      minWidth: 100,
      flex: 1,
    },

    // { field: "cSupName", flex: 1 },
    { field: "created_by", headerName: "created by", minWidth: 80, flex: 1 },
    {
      field: "created_date",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),

      minWidth: 90,
      flex: 1,
    },
    {
      field: "scm",
      headerName: "Check By SCM-Head",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "scm_app_date",
      headerName: "Check by date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "cm",
      headerName: "Check By concern-merchant",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "cm_app_date",
      headerName: "Check by date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "mm",
      headerName: "Check By mm/agm/dgm",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "mm_app_date",
      headerName: "Check by date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "dmm",
      headerName: "Authorized By-DMM",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "dmm_app_date",
      headerName: "Authorized by date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 120,
      flex: 1,
    },
    {
      field: "ia",
      headerName: "Authorized By-internal audit",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "ia_app_date",
      headerName: "Authorized by date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 130,
      flex: 1,
    },
  ];
  const rows = row?.map((row, i) => ({ ...row, id: i }));
  const viewRows = viewData?.map((row, i) => ({ ...row, id: i }));

  const handleRework = () => {
    const payload = selectedRow?.map((row) => {
      return {
        csno: row.pc_ref_no,
        comments: remarks,
        app_name: user.userName,
      };
    });
    reworkPrice(payload);
  };
  const handleApproval = () => {
    const payload = selectedRow?.map((row) => {
      return {
        csno: row.pc_ref_no,
        comments: remarks,
        app_name: user.userName,
      };
    });
    mdApproval(payload);
  };
  useEffect(() => {
    refetch();
    setSelectedRows([]);
    if (mdData) successToast("Approved successfully!");
    if (data) successToast("Re-Work successfully!");
  }, [data, mdData]);
  return (
    <>
      {/* table  */}
      <CustomTable
        checkboxSelection={true}
        columns={columns}
        rows={rows ?? []}
        loading={isIALoading}
        setSelectedRows={setSelectedRows}
        isSuccess={isSuccess | isMDSuccess}
        height={rows?.length > 0 ? "auto" : "280px"}
      />
      <Grid item xs={12} sx={{ my: 1, mr: "1px" }}>
        <CustomTextInput
          multiline={true}
          label={"Comments"}
          name="remarks"
          readOnly={false}
          value={remarks}
          // setValue={setValue}
          setStateValue={setRemarks}
        />
      </Grid>
      {/* button container */}
      <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px", mb: "1px" }}>
        <Stack
          direction={"row"}
          p={0.5}
          spacing={2}
          justifyContent="space-between"
        >
          <span></span>

          <span style={{ margin: "0px" }}>
            <SubmitButton
              title={"approval by md"}
              type="button"
              handleClick={handleApproval}
              loading={isMDLoading}
              disabled={selectedRow.length <= 0 || showMDApproval}
            />
            <span>
              <ReturnButton
                title={"IA Re-work"}
                type="button"
                handleClick={handleRework}
                loading={isLoading}
                disabled={selectedRow.length <= 0 || showIARW}
              />
            </span>
          </span>
        </Stack>
      </Box>
      <ReportViewer
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        reportData={reportDataView}
      />

      <CsViewModal
        open={viewModalOpen}
        setOpen={setViewModalOpen}
        data={viewRows}
        loading={viewLoading}
      />
    </>
  );
};

export default InternalAudit;

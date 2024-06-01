import React, { useEffect, useState } from "react";
import CustomTable from "../../table/CustomTable";
import {
  useGetPriceViewForApprovalQuery,
  useGetReportQuery,
  useLazyGetCsViewQuery,
} from "../../../redux/features/scm/priceComparison/queryPriceComparison";
import { Box, Grid, Stack } from "@mui/material";
import { formateDate } from "../../../utils/formateDate";
import CustomTextInput from "../../inputs/CustomTextInput";
import SubmitButton from "../../buttons/SubmitButton";
import { useScmApprovalMutation } from "../../../redux/features/scm/priceComparison/mutationPriceComparison";
import { useSelector } from "react-redux";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { errorToast, successToast } from "../../../common/toaster/toaster";
import CsViewModal from "./CsViewModal";
import ReportViewer from "../../report/ReportViewer";

const ForApproval = ({ showSCMApproval }) => {
  const { user } = useSelector((state) => state.auth);
  const [remarks, setRemarks] = useState("");
  const [csId, setCsId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [reportDataView, setReportDataView] = useState(null);
  const {
    data: row,
    isLoading,
    refetch,
  } = useGetPriceViewForApprovalQuery(user?.userName);
  const [
    scmApproval,
    { data, isLoading: isScmLoading, isSuccess: scmSuccess },
  ] = useScmApprovalMutation();
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
  useEffect(() => {
    if (viewError) {
      errorToast("Something Went Wrong");
      setViewModalOpen(false);
    }
  }, [viewError]);

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
    if (reportData) {
      // setModalOpen(true);
      setReportDataView(reportData);
    }
  }, [reportData]);

  // cs columns
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
            {/* <span onClick={() => handleReport(row)}>Report</span> */}

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
    // {
    //   field: "cSupName",
    //   headerName: "name",
    //   hideable: false,
    //   minWidth: 120,
    //   flex: 1,
    // },
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
    { field: "re_work_by", headerName: "Re-work By", minWidth: 90, flex: 1 },
    {
      field: "re_work_date",
      headerName: "Re-work Date",
      valueGetter: (params) => formateDate(params.value),

      minWidth: 100,
      flex: 1,
    },
    {
      field: "re_work_commnets",
      headerName: "Re-work Comments",
      minWidth: 140,
      flex: 1,
    },
  ];
  const rows = row?.map((row, i) => ({ ...row, id: i }));
  const viewRows = viewData?.map((row, i) => ({ ...row, id: i }));

  const handleScmApproval = () => {
    const payload = selectedRows?.map((row) => {
      return {
        csno: row.pc_ref_no,
        comments: remarks,
        app_name: user.userName,
      };
    });
    scmApproval(payload);
  };

  useEffect(() => {
    refetch();
    setSelectedRows([]);
    if (data) successToast("Approved successfully!");
  }, [data]);
  return (
    <>
      {/* table  */}
      <CustomTable
        checkboxSelection={true}
        columns={columns}
        rows={rows ?? []}
        loading={isLoading}
        setSelectedRows={setSelectedRows}
        isSuccess={scmSuccess}
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

          <span>
            <SubmitButton
              title={"SCM-Approval"}
              type="button"
              handleClick={handleScmApproval}
              loading={isScmLoading}
              disabled={selectedRows.length <= 0 || showSCMApproval}
            />
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

export default ForApproval;

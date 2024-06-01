import React, { useEffect, useState } from "react";
import CustomTable from "../../table/CustomTable";
import { Box, Grid, Stack } from "@mui/material";
import CustomTextInput from "../../inputs/CustomTextInput";
import SubmitButton from "../../buttons/SubmitButton";
import ReportViewer from "../../report/ReportViewer";
import CsViewModal from "../../scm/csForApproval/CsViewModal";
import {
  useGetCostingForApprovalViewQuery,
  useLazyGetCostingForApprovalReportQuery,
} from "../../../redux/features/weaving/costingForApproval/queryCostingforApproval";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { formateDate } from "../../../utils/formateDate";
import { useSelector } from "react-redux";
import { errorToast, successToast } from "../../../common/toaster/toaster";
import { useApproveCostingMutation } from "../../../redux/features/weaving/costingForApproval/mutationCostingForApproval";
import { PropTypes } from 'prop-types';


const ForApproval = ({showSCMApproval}) => {
  const { userName } = useSelector((state) => state.auth.user);
  const [selectedRows, setSelectedRows] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);

  // get for approval data
  const { data, isLoading, refetch } = useGetCostingForApprovalViewQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  // approve api
  const [
    approveCosting,
    {
      data: approveData,
      error: approvalError,
      isSuccess: approvalSuccess,
      isLoading: approvalLoading,
    },
  ] = useApproveCostingMutation();

  // handleApproval fn
  const handleApproval = () => {
    const payload = selectedRows?.map((e) => ({
      orderNo: e.orderNo,
      comments: remarks,
      approveBy: userName,
    }));
    approveCosting(payload);
  };
  // ----

  //get report data
  const [getReport, { data: reportData, error: reportError }] =
    useLazyGetCostingForApprovalReportQuery();

  const handleReport = (row) => {
    getReport({ OrderID: row?.orderNo, user: userName });
    if (reportData) {
      setReportDataView(null);
      getReport({ OrderID: row?.orderNo, user: userName });
      // setModalOpen(false);
    }
    setModalOpen(true);
  };
  // const handleView = (row) => {
  //   csViewQuery(row?.pc_ref_no);
  //   setViewModalOpen(true);
  // };
  useEffect(() => {
    if (reportData) {
      // setModalOpen(true);
      setReportDataView(reportData);
    }
  }, [reportData]);

  // toaster
  useEffect(() => {
    if (approveData && approvalSuccess) {
      successToast("Approved Successfully!");
      refetch();
    }
  }, [approveData]);
  useEffect(() => {
    if (approvalError) {
      errorToast("Something went wrong!");
    }
  }, [approvalError]);
  useEffect(() => {
    if (reportError) {
      errorToast("Something went wrong!");
      setModalOpen(false);
    }
  }, [reportError]);

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
            {/* <span
              onClick={() => handleView(row?.row)}
              style={{
                color: "#1976d2",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              view <FaEye color="#1976d2" />
            </span> */}
          </Box>
        );
      },
      minWidth: 120,
      flex: 1,
    },
    { field: "or_style_no", headerName: "Order No", minWidth: 70, flex: 1 },
    { field: "cust_name", headerName: "Customer Name", minWidth: 70, flex: 1 },
    { field: "buyer_name", headerName: "Buyer Name", minWidth: 70, flex: 1 },
    {
      field: "fcom_composition",
      headerName: "Fabric Composition",
      minWidth: 70,
      flex: 1,
    },
    { field: "verssion", headerName: "Version", minWidth: 70, flex: 1 },
    { field: "created_by", headerName: "Created By", minWidth: 80, flex: 1 },
    {
      field: "created_date",
      headerName: "Created Date",
      valueGetter: (params) => formateDate(params.value),

      minWidth: 90,
      flex: 1,
    },
  ];

  return (
    <>
      {/* table  */}
      <CustomTable
        checkboxSelection={true}
        columns={columns}
        rows={data?.map((e, i) => ({ ...e, id: i + 1 })) ?? []}
        loading={isLoading}
        setSelectedRows={setSelectedRows}
        // isSuccess={scmSuccess}
        height={data?.length > 0 ? "auto" : "280px"}
      />
      <Grid item xs={12} sx={{ my: 1, mr: "1px" }}>
        <CustomTextInput
          multiline={true}
          label={"Comments"}
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
              title={"Approve"}
              type="button"
              handleClick={handleApproval}
              loading={approvalLoading}
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

      {/* <CsViewModal
    open={viewModalOpen}
    setOpen={setViewModalOpen}
    data={viewRows}
    loading={viewLoading}
  /> */}
    </>
  );
};

ForApproval.propTypes = {
  showSCMApproval: PropTypes.bool,
};

export default ForApproval;


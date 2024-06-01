import React, { useEffect, useState } from "react";
import CustomTable from "../table/CustomTable";
import { Box, Grid, Stack } from "@mui/material";
import SubmitButton from "../buttons/SubmitButton";
import { Link } from "react-router-dom";
import ReturnButton from "../buttons/ReturnButton";
import {
  useGetExportForApprovalQuery,
  useGetExportReportQuery,
} from "../../redux/features/export/forApproval/queryForApproval";
import { formateDate } from "../../utils/formateDate";
import {
  useExportForApprovalCancelMutation,
  useExportForApprovalMutation,
} from "../../redux/features/export/forApproval/mutationForApproval";
import { errorToast, successToast } from "../../common/toaster/toaster";
import ErrorButton from "../buttons/ErrorButton";
import ReportViewer from "../report/ReportViewer";
import { useSelector } from "react-redux";
import { BsFileEarmarkPdf } from "react-icons/bs";

const ExportForApproval = () => {
  const { user } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  const [supplierId, setSupplierId] = useState(null);
  const [selectedRow, setSelectedRows] = useState([]);

  const {
    data: forApprovalData,
    isLoading: isForApprovalLoading,
    refetch,
  } = useGetExportForApprovalQuery(user?.companyID, {
    refetchOnMountOrArgChange: true,
  });

  const { data: reportData, refetch: refetchReport } =
    useGetExportReportQuery(supplierId);
  const [exportForApproval, { data, isSuccess, isLoading, isError }] =
    useExportForApprovalMutation();
  const [
    exportForApprovalCancel,
    {
      data: cancelData,
      isSuccess: isCancelSuccess,
      isLoading: isCancelLoading,
      isError: isCancelError,
    },
  ] = useExportForApprovalCancelMutation();

  const handleReport = (row) => {
    setSupplierId({
      expId: row?.exp_ref,
      id: user?.companyID,
      user: user?.userName,
    });
    if (reportData) {
      setReportDataView(null);
      refetchReport();
      // setModalOpen(false);
    }
    setModalOpen(true);
  };
  const handleApproval = () => {
    const payload = selectedRow?.map((row) => {
      return {
        expID: row?.exp_ref,
        userName: user?.userName,
      };
    });

    exportForApproval(payload);
  };
  // handleCancel function
  const handleCancel = () => {
    const payload = selectedRow?.map((row) => {
      return {
        expID: row?.exp_ref,
      };
    });

    exportForApprovalCancel(payload);
  };

  useEffect(() => {
    if (reportData) {
      // setModalOpen(true);
      setReportDataView(reportData);
    }
  }, [reportData]);
  useEffect(() => {
    if (!isError) refetch();
    if (data) successToast("Approved successfully!");
    if (isError) errorToast("Something Went Wrong!");
    if (!isCancelError) refetch();
    if (cancelData) successToast("Canceled successfully!");
    if (isCancelError) errorToast("Something Went Wrong!");
    setSelectedRows([]);
  }, [data, isError, isCancelError, cancelData]);

  const forApprovalColumns = [
    {
      field: "id",
      headerName: "Report",
      accessor: "Report",
      renderCell: (row) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <span
              onClick={() => handleReport(row?.row)}
              style={{ color: "#1976d2", cursor: "pointer" }}
            >
              Report <BsFileEarmarkPdf color="red" />
            </span>
          </Box>
        );
      },
      minWidth: 80,
      maxWidth: 85,
      flex: 1,
    },
    // { field: "cMainCategory", headerName: "Report", flex: 1 },
    {
      field: "exp_ref",
      headerName: "Challan No",
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "sew_factory",
      headerName: "Sewing Factory",
      minWidth: 180,
      flex: 1,
    },
    { field: "shift_from", headerName: "Company", minWidth: 150, flex: 1 },
    {
      field: "exp_del_to",
      headerName: "Delivery To",
      minWidth: 200,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "exp_qty",
      headerName: "Export Qty (Pcs)",
      minWidth: 150,
      maxWidth: 150,
      flex: 1,
    },

    {
      field: "exp_ctnQty",
      headerName: "Carton Qty",
      minWidth: 120,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "exp_date",
      headerName: "Export Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 120,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "exp_input_user",
      headerName: "created by",
      minWidth: 120,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "exp_input_date",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 120,
      maxWidth: 120,
      flex: 1,
    },
  ];
  const forApprovalRows = forApprovalData?.map((row, i) => ({ ...row, id: i }));
  return (
    <>
      <CustomTable
        columns={forApprovalColumns}
        rows={forApprovalRows ?? []}
        checkboxSelection={true}
        setSelectedRows={setSelectedRows}
        loading={isForApprovalLoading}
        isSuccess={isSuccess || isCancelSuccess || isCancelError || isError}
        height={forApprovalRows?.length > 0 ? "auto" : "280px"}
      />
      <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={0.5}
          spacing={2}
          justifyContent="space-between"
        >
          <span style={{ margin: "0px" }}>
            <ErrorButton
              title={"cancel"}
              handleClick={handleCancel}
              loading={isCancelLoading}
              disabled={selectedRow.length <= 0}
            />
          </span>

          <span style={{ margin: "0px", width: "50%" }}>
            <Grid container spacing={0.5} mr={1}>
              <Grid item xs={12} sm={6}>
                <Link to={"/export-challan-gate-pass"}>
                  <ReturnButton title={"go to export"} fullWidth />
                </Link>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SubmitButton
                  fullWidth
                  title={"Approve"}
                  type="button"
                  handleClick={handleApproval}
                  loading={isLoading}
                  disabled={selectedRow.length <= 0}
                />
              </Grid>
            </Grid>
          </span>
        </Stack>
      </Box>

      <ReportViewer
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        reportData={reportDataView}
      />
    </>
  );
};

export default ExportForApproval;

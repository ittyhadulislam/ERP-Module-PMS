import React, { useEffect, useState } from "react";
import CustomTable from "../table/CustomTable";
import { Box } from "@mui/material";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { formateDate } from "../../utils/formateDate";
import { useSelector } from "react-redux";
import {
  useGetExportApprovalQuery,
  useGetExportReportQuery,
  useLazyGetExportReportQuery,
} from "../../redux/features/export/forApproval/queryForApproval";
import { errorToast } from "../../common/toaster/toaster";
import ReportViewer from "../report/ReportViewer";

const ExportApproved = () => {
  const { user } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  const [supplierId, setSupplierId] = useState(null);

  const {
    data: approvalData,
    isLoading: isApprovalLoading,
    refetch,
  } = useGetExportApprovalQuery(user?.companyID, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: reportData,
    refetch: refetchReport,
    error,
  } = useGetExportReportQuery(supplierId);

  // useLazyGetExportReportQuery

  const [
    trigger,
    {
      data: reportData1,
      isSuccess: reportSuccess,
      isError: reportError,
      isFetching: reportLoading,
    },
  ] = useLazyGetExportReportQuery();
  const handleReport = (row) => {
    if (!reportLoading) {
      trigger({
        expId: row?.exp_ref,
        id: user?.companyID,
        user: user?.userName,
      });
    }

    // setSupplierId({
    //   expId: row?.exp_ref,
    //   id: user?.companyID,
    //   user: user?.userName,
    // });
    // if (reportData) {
    //   setReportDataView(null);
    //   refetchReport();
    //   // setModalOpen(false);
    // }
    // setModalOpen(true);
  };
  useEffect(() => {
    if (reportData1) {
      setReportDataView(reportData1);
    }
    reportSuccess && setModalOpen(true);
    reportError && errorToast("Something went wrong");
  }, [reportData1, reportSuccess, reportError]);
  const approvalColumns = [
    {
      field: "id",
      headerName: "Report",
      accessor: "Report",
      renderCell: (row) => {
        return (
          <Box
            sx={{ display: "flex", justifyContent: "center" }}
            key={row.row.exp_ref}
          >
            <span
              onClick={() => handleReport(row?.row)}
              style={{ color: "#1976d2", cursor: "pointer" }}
            >
              <>
                Report <BsFileEarmarkPdf color="red" />
              </>
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
    {
      field: "exp_app_user",
      headerName: "Approved By",
      minWidth: 120,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "exp_app_date",
      headerName: "Approved date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 140,
      maxWidth: 140,
      flex: 1,
    },
  ];
  const approvedRows = approvalData?.map((row, i) => ({ ...row, id: i }));

  return (
    <>
      <CustomTable
        columns={approvalColumns}
        rows={approvedRows ?? []}
        //   checkboxSelection={true}
        // setSelectedRows={setSelectedRows}
        loading={isApprovalLoading}
        //   isSuccess={isSuccess}
        height={approvedRows?.length > 0 ? "auto" : "280px"}
      />

      <ReportViewer
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        reportData={reportDataView}
      />
    </>
  );
};

export default ExportApproved;

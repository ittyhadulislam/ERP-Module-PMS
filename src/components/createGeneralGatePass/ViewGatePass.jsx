import React, { useEffect, useState } from "react";
import CustomTable from "../table/CustomTable";
import { formateDate } from "../../utils/formateDate";
import {
  useGetAddViewDetailsQuery,
  useLazyGetAddViewReportQuery,
} from "../../redux/features/gatePass/createGeneralGatePass/createGeneralGatePassQuery";
import { errorToast } from "../../common/toaster/toaster";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { BsFileEarmarkPdf } from "react-icons/bs";
import ReportViewer from "../report/ReportViewer";

const ViewGatePass = () => {
  const { userName, companyID } = useSelector((state) => state.auth.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);

  // useGetAddViewDetailsQuery
  const { data, isError, error, isLoading } = useGetAddViewDetailsQuery(
    {
      id: companyID,
      user: userName,
    },
    { refetchOnMountOrArgChange: true }
  );
  // Get Add View Report Query
  const [
    getReport,
    { data: reportData, isLoading: reportLoading, error: reportError },
  ] = useLazyGetAddViewReportQuery();

  // handle Report fn
  const handleReport = (row) => {
    getReport({ id: companyID, user: userName, gpNo: row?.gp_ref });
    setModalOpen(true);
  };
  useEffect(() => {
    reportData && setReportDataView(reportData);
  }, [reportData]);

  // toaster setup
  useEffect(() => {
    isError && errorToast("Something went wrong!");
  }, [error]);
  useEffect(() => {
    reportError && errorToast("Something went wrong!");
    reportError && setModalOpen(false);
  }, [reportError]);

  const viewColumns = [
    {
      field: "id",
      headerName: "Report",
      accessor: "Report",
      align: "center",
      renderCell: (row) => {
        return (
          <Box>
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
      maxWidth: 80,
      flex: 1,
    },
    // { field: "cMainCategory", headerName: "Report", flex: 1 },
    {
      field: "gp_ref",
      headerName: "Challan/GP",
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
    },
    { field: "com_nm", headerName: "Company", minWidth: 120, flex: 1 },
    { field: "dpt_nm", headerName: "Department", minWidth: 120, flex: 1 },
    {
      field: "gp_sent_to",
      headerName: "Delivery To",
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "gp_carried",
      headerName: "Carried By",
      minWidth: 120,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "gp_crt_nm",
      headerName: "created by",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "gp_crt_date",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      maxWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
  ];
  return (
    <>
      <CustomTable
        columns={viewColumns}
        rows={data?.map((e, i) => ({ ...e, id: i + 1 })) ?? []}
        loading={isLoading}
        height={data?.length > 0 ? "auto" : "280px"}
      />
      <ReportViewer
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        reportData={reportDataView}
      />
    </>
  );
};

export default ViewGatePass;

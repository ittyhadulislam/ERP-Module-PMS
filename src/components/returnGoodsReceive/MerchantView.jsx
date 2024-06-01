import React, { useEffect, useState } from "react";
import CustomTable from "../table/CustomTable";
import { formateDate } from "../../utils/formateDate";
import {
  useGetReturnMerchantViewQuery,
  useLazyGetReturnGoodsReportQuery,
} from "../../redux/features/gatePass/returnGoodsReceive/returnGoodsReceiveQuery";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { errorToast } from "../../common/toaster/toaster";
import ReportViewer from "../report/ReportViewer";

const MerchantView = () => {
  const { userName, companyID } = useSelector((state) => state.auth.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);

  // get table data
  const { data, isLoading } = useGetReturnMerchantViewQuery(companyID);
  // get report data
  const [getReport, { data: reportData, error: reportError }] =
    useLazyGetReturnGoodsReportQuery();

  // handle Report fn
  const handleReport = (row) => {
    getReport({ id: companyID, user: userName, gpId: row?.rgr_ref });
    setModalOpen(true);
  };
  useEffect(() => {
    reportData && setReportDataView(reportData);
  }, [reportData]);
  useEffect(() => {
    reportError && errorToast("Something went wrong!");
    reportError && setModalOpen(false);
  }, [reportError]);
  // table columns
  const viewColumns = [
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
      maxWidth: 80,
      flex: 1,
    },
    // { field: "cMainCategory", headerName: "Report", flex: 1 },
    {
      field: "rgr_gp_ref",
      headerName: "GP No",
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "rgr_ref",
      headerName: "GR No",
      minWidth: 80,
      maxWidth: 80,
      flex: 1,
    },
    {
      field: "rgr_rcvd_dt",
      headerName: "Received Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 120,
      maxWidth: 120,
      //   minWidth: 120,
      flex: 1,
    },
    {
      field: "rgr_ent_nm",
      headerName: "created by",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "rgr_ent_dt",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 120,
      maxWidth: 120,
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

export default MerchantView;

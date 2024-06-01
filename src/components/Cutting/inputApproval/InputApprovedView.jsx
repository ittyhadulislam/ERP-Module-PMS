import React, { useEffect, useState } from "react";

import CustomTable from "../../table/CustomTable";
import { formateDate } from "../../../utils/formateDate";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  useGetInputApprovalQuery,
  useGetInputApprovalReportQuery,
} from "../../../redux/features/cutting/inputApproval/queryInputApproval";
import { Box } from "@mui/material";
import ReportViewer from "../../report/ReportViewer";

const InputApprovedView = () => {
  const { user } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  const [challanNumber, setChallanNumber] = useState(null);

  //approved view data
  const { data: approvalData, isLoading: isApprovalLoading } =
    useGetInputApprovalQuery(user?.companyID);
  // report api
  const { data: reportData, refetch: refetchReport } =
    useGetInputApprovalReportQuery({
      id: user?.companyID,
      challan: challanNumber,
      user: user?.userName,
    });

  const approvalColumns = [
    // { field: "cMainCategory", headerName: "Report", flex: 1 },
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
              <BsFileEarmarkPdf
                color="red"
                size={15}
                style={{ marginRight: "4px" }}
              />
              Report
            </span>
          </Box>
        );
      },
      maxWidth: 80,
      minWidth: 80,
      flex: 1,
    },
    // {
    //   //   field: "id",
    //   headerName: "Print Barcode",
    //   accessor: "Report",
    //   renderCell: (row) => {
    //     return (
    //       <Box sx={{ display: "flex", justifyContent: "center" }}>
    //         <span
    //           onClick={() => handleReport(row?.row)}
    //           style={{ color: "#1976d2", cursor: "pointer" }}
    //         >
    //           <AiOutlinePrinter
    //             color="green"
    //             size={16}
    //             style={{ marginRight: "4px" }}
    //           />
    //           Print
    //         </span>
    //       </Box>
    //     );
    //   },
    //   maxWidth: 120,
    //   minWidth: 120,
    //   flex: 1,
    // },
    {
      field: "bTinput_ref",
      headerName: "Challan No",
      //   minWidth: 200,
      flex: 1,
    },
    { field: "btStyle", headerName: "Style No", flex: 1 },
    { field: "btLineDes", headerName: "Line", flex: 1 },
    { field: "btScanBy", headerName: "created by", flex: 1 },
    {
      field: "btScanDate",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),

      //   minWidth: 120,
      flex: 1,
    },
    { field: "cUserFullname", headerName: "Approved By", flex: 1 },
    {
      field: "approved_dt",
      headerName: "Approved date",
      valueGetter: (params) => formateDate(params.value),

      //   minWidth: 120,
      flex: 1,
    },
  ];

  const approvalView = approvalData?.map((row, i) => ({ ...row, id: i }));

  const handleReport = (row) => {
    setChallanNumber(row?.bTinput_ref);
    if (reportData) {
      setReportDataView(null);
      refetchReport();
      // setModalOpen(false);
    }
    setModalOpen(true);
  };
  useEffect(() => {
    if (reportData) {
      // setModalOpen(true);
      setReportDataView(reportData);
    }
  }, [reportData]);

  return (
    <>
      <CustomTable
        columns={approvalColumns}
        rows={approvalView ?? []}
        loading={isApprovalLoading}
        height={approvalView?.length > 0 ? "auto" : "180px"}
        //   isSuccess={isSuccess}
      />
      <ReportViewer
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        reportData={reportDataView}
      />
    </>
  );
};

export default InputApprovedView;

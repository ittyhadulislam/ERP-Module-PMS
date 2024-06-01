import React, { useEffect, useState } from "react";
import CustomTable from "../../table/CustomTable";
import { Box, Stack } from "@mui/material";
import SubmitButton from "../../buttons/SubmitButton";
import {
  useGetCuttingApprovalViewQuery,
  useGetCuttingReportQuery,
} from "../../../redux/features/cutting/cuttingApproval/queryCuttingApproval";
import { useSelector } from "react-redux";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { formateDate } from "../../../utils/formateDate";
import {
  useCancelCuttingMutation,
  useCuttingApproveMutation,
} from "../../../redux/features/cutting/cuttingApproval/mutationCuttingApproval";
import { successToast } from "../../../common/toaster/toaster";
import ErrorButton from "../../buttons/ErrorButton";
import ReturnButton from "../../buttons/ReturnButton";
import { Link } from "react-router-dom";
import ReportViewer from "../../report/ReportViewer";

const CuttingForApprovalView = () => {
  const { user } = useSelector((state) => state.auth);
  const [selectedRow, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  const [forReport, setForReport] = useState(null);

  const {
    data: forApprovalData,
    isLoading: isForApprovalLoading,
    refetch,
  } = useGetCuttingApprovalViewQuery(user?.companyID);

  const [
    cuttingApprove,
    { data: saveData, isSuccess: isSaveSuccess, isLoading: isSaveLoading },
  ] = useCuttingApproveMutation();
  // cutting cancel
  const [
    cancelCutting,
    { isLoading: isCancelLoading, isSuccess: isCancelSuccess },
  ] = useCancelCuttingMutation();

  const { data: reportData, refetch: refetchReport } =
    useGetCuttingReportQuery(forReport);

  const handleApproval = () => {
    const payload = selectedRow?.map((row) => {
      return {
        style: row.nStyleID,
        cutno: row.nCutNo,
        layno: row.cLayNo,
      };
    });
    cuttingApprove(payload);
  };

  const handleCancel = () => {
    const payload = selectedRow?.map((row) => {
      return {
        style: row.nStyleID,
        cutno: row.nCutNo,
        layno: row.cLayNo,
      };
    });

    cancelCutting(payload);
  };

  // const buttonArray = ["btncom", "BtnCancel"];
  // // button permission
  // const [buttonPermission, { data: buttonData }] =
  //   useButtonPermissionMutation();

  // useEffect(() => {
  //   const payload = buttonArray.map((e) => ({
  //     buttonName: e,
  //     controller: "R2m_Input_Approval.aspx",
  //     isShow: true,
  //     userName: user?.userName,
  //   }));
  //   buttonPermission(payload);
  // }, []);

  // const showApproval = !buttonData?.find((e) => e?.buttonName === "btncom")
  //   ?.isShow;
  // const showCancel = !buttonData?.find((e) => e?.buttonName === "BtnCancel")
  //   ?.isShow;

  useEffect(() => {
    refetch();
    setSelectedRows([]);
    isSaveSuccess && successToast("Approved Successfully!");
    isCancelSuccess && successToast("Cancelled Successfully");
  }, [isSaveSuccess, isCancelSuccess]);

  useEffect(() => {
    if (reportData) {
      // setModalOpen(true);
      setReportDataView(reportData);
    }
  }, [reportData]);
  const handleReport = (row) => {
    const { nStyleID, cLayNo, nCutNo } = row;
    setForReport({
      style: nStyleID,
      cut: nCutNo,
      lay: cLayNo,
      comID: user?.companyID,
      user: user?.userName,
    });
    // setSupplierId(row?.si_id);
    if (reportData) {
      setReportDataView(null);
      refetchReport();
      setModalOpen(false);
    }
    setModalOpen(true);
  };

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
      maxWidth: 80,
      minWidth: 80,
      flex: 1,
    },
    // { field: "cMainCategory", headerName: "Report", flex: 1 },
    {
      field: "cStyleNo",
      headerName: "Style No",
      // minWidth: 100,
      maxWidth: 80,
      flex: 1,
    },
    { field: "nOrderPO", headerName: "PO No", flex: 1 },
    { field: "cLayNo", headerName: "Lay No", maxWidth: 80, flex: 1 },
    { field: "cRealLay", headerName: "Manual Lay", maxWidth: 120, flex: 1 },
    { field: "nCutNo", headerName: "Cut No", maxWidth: 80, flex: 1 },
    { field: "cCmpName", headerName: "Company", flex: 1 },
    {
      field: "proDate",
      headerName: "Cutting Date",
      valueGetter: (params) => formateDate(params.value),

      //   minWidth: 120,
      flex: 1,
    },
    { field: "cEntUser", headerName: "Created By", flex: 1 },
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
        isSuccess={isSaveSuccess}
        height={forApprovalRows?.length > 0 ? "auto" : "280px"}
      />
      <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={0.5}
          spacing={2}
          justifyContent="space-between"
        >
          <span>
            <Link to={"/cutting-lay-ratio"}>
              <ReturnButton title={"Go to Approval"} />
            </Link>
          </span>

          <span>
            <ErrorButton
              title={"cancel"}
              handleClick={handleCancel}
              // loading={isCancelLoading}
              // disabled={selectedRow.length <= 0 || showCancel}
            />
            <SubmitButton
              title={"Approve"}
              type="button"
              handleClick={handleApproval}
              loading={isSaveLoading}
              // disabled={selectedRow.length <= 0 || showApproval}
              disabled={selectedRow.length <= 0}
            />
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

export default CuttingForApprovalView;

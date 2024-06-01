import React, { useEffect, useState } from "react";
import CustomTable from "../../table/CustomTable";
import { Box, Stack } from "@mui/material";
import SubmitButton from "../../buttons/SubmitButton";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { useGetInputForApprovalReportQuery } from "../../../redux/features/cutting/inputApproval/queryInputApproval";
import { useSelector } from "react-redux";
import { formateDate } from "../../../utils/formateDate";
import ErrorButton from "../../buttons/ErrorButton";
import { successToast } from "../../../common/toaster/toaster";
import { Link } from "react-router-dom";
import ReturnButton from "../../buttons/ReturnButton";
import { useGetBarcodeForApprovalQuery } from "../../../redux/features/cutting/barcodeApproval/queryBarcodeApproval";
import {
  useBarcodeApprovalMutation,
  useBarcodeCancelMutation,
} from "../../../redux/features/cutting/barcodeApproval/mutationBarcodeApproval";
import { useButtonPermissionMutation } from "../../../redux/features/permission/permissionApi";
import ReportViewer from "../../report/ReportViewer";

const BarcodeForApprovalView = () => {
  const { user } = useSelector((state) => state.auth);
  const [selectedRow, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  const [challanNumber, setChallanNumber] = useState(null);

  const buttonArray = ["btnBcom", "BtnBCancel"];
  // button permission
  const [buttonPermission, { data: buttonData }] =
    useButtonPermissionMutation();

  useEffect(() => {
    const payload = buttonArray.map((e) => ({
      buttonName: e,
      controller: "R2m_Input_Barcode_Approval.aspx",
      isShow: true,
      userName: user?.userName,
    }));
    buttonPermission(payload);
  }, []);

  const showApproval = !buttonData?.find((e) => e?.buttonName === "btnBcom")
    ?.isShow;
  const showCancel = !buttonData?.find((e) => e?.buttonName === "BtnBCancel")
    ?.isShow;

  const {
    data: forApprovalData,
    isLoading: isForApprovalLoading,
    refetch,
  } = useGetBarcodeForApprovalQuery(user?.companyID, {
    refetchOnMountOrArgChange: true,
  });
  // input approval
  const [
    barcodeApproval,
    { isLoading: isApprovedLoading, isSuccess: isApprovedSuccess },
  ] = useBarcodeApprovalMutation();
  // input cancel
  const [
    barcodeCancel,
    { isLoading: isCancelLoading, isSuccess: isCancelSuccess },
  ] = useBarcodeCancelMutation();

  // report api
  const { data: reportData, refetch: refetchReport } =
    useGetInputForApprovalReportQuery({
      id: user?.companyID,
      challan: challanNumber,
      user: user?.userName,
    });

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
  ];
  const forApprovalView = forApprovalData?.map((row, i) => ({ ...row, id: i }));
  const handleApproval = () => {
    const payload = selectedRow?.map((row) => {
      return {
        inputref: row?.bTinput_ref,
        username: user?.userName,
      };
    });
    barcodeApproval(payload);
  };
  const handleCancel = () => {
    const payload = selectedRow?.map((row) => {
      return {
        inputref: row?.bTinput_ref,
        username: user?.userName,
      };
    });
    barcodeCancel(payload);
  };

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

  useEffect(() => {
    if (isApprovedSuccess || isCancelSuccess) {
      refetch();
      isCancelSuccess && successToast("Cancelled Successfully");
      isApprovedSuccess && successToast("Approved Successfully");
    }
  }, [isApprovedSuccess, isCancelSuccess]);
  return (
    <>
      <CustomTable
        columns={forApprovalColumns}
        rows={forApprovalView ?? []}
        checkboxSelection={true}
        setSelectedRows={setSelectedRows}
        loading={isForApprovalLoading}
        isSuccess={isApprovedSuccess}
        height={forApprovalView?.length > 0 ? "auto" : "280px"}
      />
      <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={0.5}
          spacing={2}
          justifyContent="space-between"
        >
          <span>
            <Link to={"/generate-barcode"}>
              <ReturnButton title={"go to barcode"} />
            </Link>
          </span>

          <span>
            <ErrorButton
              title={"cancel"}
              handleClick={handleCancel}
              loading={isCancelLoading}
              disabled={selectedRow.length <= 0 || showCancel}
            />
            <SubmitButton
              title={"Approve"}
              type="button"
              handleClick={handleApproval}
              loading={isApprovedLoading}
              disabled={selectedRow.length <= 0 || showApproval}
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

export default BarcodeForApprovalView;

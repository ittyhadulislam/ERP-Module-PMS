import React, { useEffect, useState } from "react";
import CustomTable from "../table/CustomTable";
import { formateDate } from "../../utils/formateDate";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { Stack } from "@mui/material";
import SubmitButton from "../buttons/SubmitButton";
import ReturnButton from "../buttons/ReturnButton";
import ErrorButton from "../buttons/ErrorButton";
import {
  useCancelMutation,
  useCheckByReturnMutation,
  useCheckMutation,
} from "../../redux/features/gatePass/generalForApproval/generalForApprovalMutaion";
import { errorToast, successToast } from "../../common/toaster/toaster";
import ReportViewer from "../report/ReportViewer";
import { useLazyGetMerchantCheckByQuery } from "../../redux/features/gatePass/merchantForApproval/merchantForApprovalQuery";
import { useLazyGetMerchantAddViewReportQuery } from "../../redux/features/gatePass/createMerchantGatePass/createMerchantGatePassQuery";

const CheckBy = ({ buttonData, company }) => {
  const { companyID, userName } = useSelector((state) => state.auth.user);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);

  // get table data
  const [getMerchantView, { data, isLoading }] =
    useLazyGetMerchantCheckByQuery();
  useEffect(() => {
    company && getMerchantView(company?.nCompanyID);
  }, [company]);
  // check mutation
  const [
    check,
    {
      data: checkData,
      isLoading: checkLoading,
      isSuccess: checkSuccess,
      error: checkError,
    },
  ] = useCheckMutation();
  // return mutation
  const [
    checkByReturn,
    {
      data: returnData,
      isLoading: returnLoading,
      isSuccess: returnSuccess,
      error: returnError,
    },
  ] = useCheckByReturnMutation();
  // cancel mutation
  const [
    cancel,
    {
      data: cancelData,
      isLoading: cancelLoading,
      isSuccess: cancelSuccess,
      error: cancelError,
    },
  ] = useCancelMutation();

  // Get Report Query
  const [getReport, { data: reportData, error: reportError }] =
    useLazyGetMerchantAddViewReportQuery();

  // handle Report fn
  const handleReport = (row) => {
    getReport({ id: companyID, user: userName, gpNo: row?.gp_ref });
    setModalOpen(true);
  };
  useEffect(() => {
    reportData && setReportDataView(reportData);
  }, [reportData]);

  // handleClick fn
  const handleClick = (e) => {
    const payload = selectedRows?.map((row) => ({
      gpno: row.gp_ref,
      userName: userName,
    }));
    e === "check" && check(payload);
    e === "return" && checkByReturn(payload);
    e === "cancel" && cancel(payload);
  };

  // toaster effect
  useEffect(() => {
    checkSuccess && successToast("Check Successful !");
    checkSuccess && getMerchantView(company?.nCompanyID);
  }, [checkData]);
  useEffect(() => {
    checkError && errorToast("Something went wrong !");
  }, [checkError]);
  //
  useEffect(() => {
    returnSuccess && successToast("Check Successful !");
    returnSuccess && getMerchantView(company?.nCompanyID);
  }, [returnData]);
  useEffect(() => {
    returnError && errorToast("Something went wrong !");
  }, [returnError]);
  //
  useEffect(() => {
    cancelSuccess && successToast("Check Successful !");
    cancelSuccess && getMerchantView(company?.nCompanyID);
  }, [cancelData]);
  useEffect(() => {
    cancelError && errorToast("Something went wrong !");
  }, [cancelError]);
  //
  useEffect(() => {
    reportError && errorToast("Something went wrong!");
    reportError && setModalOpen(false);
  }, [reportError]);

  // ----------------------------------------------------------------

  const showApproval = !buttonData?.find((e) => e?.buttonName === "BtnChk")
    ?.isShow;
  const showReturn = !buttonData?.find((e) => e?.buttonName === "btnreturn")
    ?.isShow;
  const showCancel = !buttonData?.find((e) => e?.buttonName === "btnChkCancel")
    ?.isShow;

  // ----------------------------------------------------------------

  // isDisabled
  const isDisabled = selectedRows?.length == 0;
  // table columns
  const columns = [
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
      minWidth: 170,
      flex: 1,
    },
    {
      field: "gp_st_desc",
      headerName: "Status",
      minWidth: 120,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "crtby",
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
        rows={company ? data?.map((e, i) => ({ ...e, id: i + 1 })) : []}
        height={data?.length > 0 && company ? "auto" : "280px"}
        checkboxSelection
        setSelectedRows={setSelectedRows}
        columns={columns}
        loading={isLoading}
        isSuccess={checkSuccess || cancelSuccess || returnSuccess}
      />
      <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px", mb: "1px" }}>
        <Stack
          direction={"row"}
          p={1}
          spacing={2}
          justifyContent="space-between"
        >
          <span></span>

          <span style={{ margin: "0px" }}>
            <SubmitButton
              title={"Check"}
              handleClick={() => handleClick("check")}
              loading={checkLoading}
              disabled={isDisabled || showApproval}
            />
            <ReturnButton
              title={"Return"}
              handleClick={() => handleClick("return")}
              loading={returnLoading}
              disabled={isDisabled || showReturn}
            />
            <ErrorButton
              title={"Check by Cancel"}
              handleClick={() => handleClick("cancel")}
              loading={cancelLoading}
              disabled={isDisabled || showCancel}
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

export default CheckBy;

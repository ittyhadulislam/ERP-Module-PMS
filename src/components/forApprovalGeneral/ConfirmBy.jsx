import React, { useEffect, useState } from "react";
import CustomTable from "../table/CustomTable";
import { useGetConfirmByQuery } from "../../redux/features/gatePass/generalForApproval/generalForApprovalQuery";
import { formateDate } from "../../utils/formateDate";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { Stack } from "@mui/material";
import SubmitButton from "../buttons/SubmitButton";
import ErrorButton from "../buttons/ErrorButton";
import {
  useCancelMutation,
  useConfirmMutation,
} from "../../redux/features/gatePass/generalForApproval/generalForApprovalMutaion";
import { errorToast, successToast } from "../../common/toaster/toaster";
import ReportViewer from "../report/ReportViewer";
import { useLazyGetAddViewReportQuery } from "../../redux/features/gatePass/createGeneralGatePass/createGeneralGatePassQuery";

const ConfirmBy = ({ buttonData }) => {
  const { companyID, userName } = useSelector((state) => state.auth.user);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);

  // get table data
  const { data, isLoading, refetch } = useGetConfirmByQuery(companyID, {
    refetchOnMountOrArgChange: true,
  });
  // confirm mutation
  const [
    confirm,
    {
      data: confirmData,
      isLoading: confirmLoading,
      isSuccess: confirmSuccess,
      error: confirmError,
    },
  ] = useConfirmMutation();
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
    useLazyGetAddViewReportQuery();

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
    e === "confirm" && confirm(payload);
    e === "confirmByCancel" && cancel(payload);
  };

  // toaster effect
  useEffect(() => {
    confirmSuccess && successToast("Check Successful !");
    confirmSuccess && refetch();
  }, [confirmData]);
  useEffect(() => {
    confirmError && errorToast("Something went wrong !");
  }, [confirmError]);
  //
  useEffect(() => {
    cancelSuccess && successToast("Check Successful !");
    cancelSuccess && refetch();
  }, [cancelData]);
  useEffect(() => {
    cancelError && errorToast("Something went wrong !");
  }, [cancelError]);
  //
  useEffect(() => {
    reportError && errorToast("Something went wrong!");
    reportError && setModalOpen(false);
  }, [reportError]);

  // button permissions
  const showConfirm = !buttonData?.find((e) => e?.buttonName === "BtnCNF")
    ?.isShow;
  const showCancel = !buttonData?.find((e) => e?.buttonName === "btnCnfCancel")
    ?.isShow;

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
    {
      field: "chkby",
      headerName: "check by",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "gp_chk_date",
      headerName: "check date",
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
        rows={data?.map((e, i) => ({ ...e, id: i + 1 }))}
        height={data?.length > 0 ? "auto" : "280px"}
        checkboxSelection
        setSelectedRows={setSelectedRows}
        columns={columns}
        loading={isLoading}
        isSuccess={confirmSuccess || cancelSuccess}
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
              title={"confirm"}
              loading={confirmLoading}
              disabled={isDisabled || showConfirm}
              handleClick={() => handleClick("confirm")}
            />
            {/* <ReturnButton title={"Return"} /> */}
            <ErrorButton
              title={"confirm by Cancel"}
              disabled={isDisabled || showCancel}
              loading={cancelLoading}
              handleClick={() => handleClick("confirmByCancel")}
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

export default ConfirmBy;

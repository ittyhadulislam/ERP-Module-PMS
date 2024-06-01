import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import CustomAppBar from "../../components/common/CustomAppBar";
import CustomAutocomplete from "../../components/inputs/CustomAutocomplete";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import SelectReport from "../../components/common/SelectReport";
import ReportButton from "../../components/buttons/ReportButton";
import {
  useGetCompanyQuery,
  useGetStatusQuery,
  useLazyGetDepartmentQuery,
} from "../../redux/features/gatePass/createGeneralGatePass/createGeneralGatePassQuery";
import {
  useLazyGetGatePassDailyReportQuery,
  useLazyGetGatePassDateToDateReportQuery,
  useLazyGetGatePassReturnDPTStatusReportQuery,
  useLazyGetGatePassReturnDateToDateReportQuery,
} from "../../redux/features/gatePass/report/gatePassReport";
import { useSelector } from "react-redux";
import { errorToast } from "../../common/toaster/toaster";
import ReportViewer from "../../components/report/ReportViewer";
const GeneralReport = () => {
  const { userName, companyID } = useSelector((state) => state.auth.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState(null);
  const [department, setDepartment] = useState(null);
  const [status, setStatus] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [companyDisable, setCompanyDisable] = useState(true);
  const [departmentDisable, setDepartmentDisable] = useState(true);
  const [statusDisable, setStatusDisable] = useState(true);
  const [fromDateDisable, setFromDateDisable] = useState(true);
  const [toDateDisable, setToDateDisable] = useState(true);

  // get company
  const { data: companyData, isLoading: companyLoading } = useGetCompanyQuery();
  // get department
  const [
    getDepartment,
    { data: departmentData, isLoading: departmentLoading },
  ] = useLazyGetDepartmentQuery();
  // get status
  const { data: statusData, isLoading: statusLoading } = useGetStatusQuery();

  // get reports
  // daily gate pass general report
  const [
    getDailyReport,
    {
      data: dailyReport,
      isFetching: dailyLoading,
      isError: dailyError,
      isSuccess: dailySuccess,
    },
  ] = useLazyGetGatePassDailyReportQuery();
  // date to date gate pass general report
  const [
    getDateToDateReport,
    {
      data: dateToDateReport,
      isFetching: dateToDateLoading,
      isError: dateToDateError,
      isSuccess: dateToDateSuccess,
    },
  ] = useLazyGetGatePassDateToDateReportQuery();
  // return report gate pass general report
  const [
    getReturnDateToDateReport,
    {
      data: returnReport,
      isFetching: returnLoading,
      isError: returnError,
      isSuccess: returnSuccess,
    },
  ] = useLazyGetGatePassReturnDateToDateReportQuery();
  // return report gate pass general report
  const [
    getReturnDepartmentReport,
    {
      data: dstReport,
      isFetching: dstLoading,
      isError: dstError,
      isSuccess: dstSuccess,
    },
  ] = useLazyGetGatePassReturnDPTStatusReportQuery();

  useEffect(() => {
    company && getDepartment(company?.nCompanyID);
  }, [company]);
  // handleReport
  const handleReport = (e) => {
    e.preventDefault();
    if (title === "Gate Pass-Daily") {
      getDailyReport({
        id: company?.nCompanyID,
        date: fromDate,
        user: userName,
      });
    } else if (title === "Gate Pass-D2D") {
      getDateToDateReport({
        id: company?.nCompanyID,
        fromDate,
        toDate,
        user: userName,
      });
    } else if (title === "GP Return Receive-D2D") {
      getReturnDateToDateReport({
        id: company?.nCompanyID,
        fromDate,
        toDate,
        user: userName,
      });
    } else if (title === "GP- DPT and STS Wise-D2D") {
      getReturnDepartmentReport({
        id: company?.nCompanyID,
        department: department?.nUserDept,
        status: status?.gp_st_id,
        fromDate,
        toDate,
        user: userName,
      });
    }
  };

  // daily report effect
  useEffect(() => {
    if (dailyError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (dailySuccess && dailyReport) {
      setModalOpen(true);
      setReportDataView(dailyReport);
    }
  }, [dailyError, dailySuccess, dailyReport]);
  // date to date report effect
  useEffect(() => {
    if (dateToDateError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (dateToDateSuccess && dateToDateReport) {
      setModalOpen(true);
      setReportDataView(dateToDateReport);
    }
  }, [dateToDateError, dateToDateSuccess, dateToDateReport]);
  // return date to date report effect
  useEffect(() => {
    if (returnError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (returnSuccess && returnReport) {
      setModalOpen(true);
      setReportDataView(returnReport);
    }
  }, [returnError, returnSuccess, returnReport]);
  // return department and status date to date report effect
  useEffect(() => {
    if (dstError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (dstSuccess && dstReport) {
      setModalOpen(true);
      setReportDataView(dstReport);
    }
  }, [dstError, dstSuccess, dstReport]);

  // reset input fields
  const resetInputField = () => {
    setCompany(null);
    setDepartment(null);
    setStatus(null);
    setFromDate(null);
    setToDate(null);
  };
  useEffect(() => {
    if (title === "Gate Pass-Daily") {
      setCompanyDisable(false);
      setDepartmentDisable(true);
      setStatusDisable(true);
      setFromDateDisable(false);
      setToDateDisable(true);

      resetInputField();
    } else if (title === "GP- DPT and STS Wise-D2D") {
      setCompanyDisable(false);
      setDepartmentDisable(false);
      setStatusDisable(false);
      setFromDateDisable(false);
      setToDateDisable(false);

      resetInputField();
    } else if (title === "Gate Pass-D2D" || title === "GP Return Receive-D2D") {
      setCompanyDisable(false);
      setDepartmentDisable(true);
      setStatusDisable(true);
      setFromDateDisable(false);
      setToDateDisable(false);

      resetInputField();
    } else {
      setCompanyDisable(true);
      setDepartmentDisable(true);
      setStatusDisable(true);
      setFromDateDisable(true);
      setToDateDisable(true);

      resetInputField();
    }
  }, [title]);

  return (
    <form onSubmit={handleReport}>
      <Box
        sx={{
          border: 1,
          borderColor: "#17a2b8",
          p: 1,

          boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <CustomAppBar title={"REPORT LIST"} />
            <Box
              sx={{
                p: 1,
                border: "1px dashed grey",
                borderTop: "none",
                height: "calc(100% - 40px)",
              }}
            >
              <SelectReport
                options={[
                  {
                    value: "bankWiseContractReport",
                    label: "Gate Pass-Daily",
                  },
                  {
                    value: "PaymentModeWiseMonthlyReport",
                    label: "Gate Pass-D2D",
                  },
                  {
                    value: "LocalAcceptanceHandOverListReport",
                    label: "GP Return Receive-D2D",
                  },
                  {
                    value: "LocalAcceptanceDocumentListReport",
                    label: "GP- DPT and STS Wise-D2D",
                  },
                ]}
                id="reportName"
                title="Report Name"
                setTitle={setTitle}
              />
            </Box>
          </Grid>
          {/* parameter */}
          <Grid item xs={12} sm={6}>
            <CustomAppBar title={"REPORT PARAMETER'S"} />
            <Box
              sx={{
                p: 1,
                border: "1px dashed grey",
                borderTop: "none",
                height: "calc(100% - 40px)",
              }}
            >
              <Grid container spacing={1} mt={"5px"}>
                <Grid item xs={12}>
                  <CustomAutocomplete
                    label={"Company"} //company ? yearData ?? [] :
                    optionLabel={"cCmpName"}
                    optionId={"nCompanyID"}
                    options={companyData ?? []}
                    value={company}
                    setSelectedValue={setCompany}
                    loading={companyLoading}
                    required={true}
                    disabled={companyDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    label={"Department"}
                    options={company ? departmentData ?? [] : []}
                    value={department}
                    optionLabel={"cDeptname"}
                    optionId={"nUserDept"}
                    setSelectedValue={setDepartment}
                    loading={departmentLoading}
                    required={true}
                    disabled={departmentDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    label={"Status "}
                    options={statusData ?? []}
                    value={status}
                    optionLabel={"gp_st_desc"}
                    optionId={"gp_st_id"}
                    setSelectedValue={setStatus}
                    loading={statusLoading}
                    required={true}
                    disabled={statusDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDatePicker
                    label={title === "Gate Pass-Daily" ? "Date" : "From Date"}
                    name={"date"}
                    disableFuture={true}
                    //   prevDate={2}
                    //   futureDate={2}
                    value={fromDate}
                    setData={setFromDate}
                    required={true}
                    disabled={fromDateDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDatePicker
                    label={"To Date"}
                    name={"date"}
                    disableFuture={true}
                    //   prevDate={2}
                    //   futureDate={2}
                    value={toDate}
                    setData={setToDate}
                    required={true}
                    disabled={toDateDisable}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ReportButton
                    title={"view report"}
                    type="submit"
                    fullWidth
                    // handleClick={handleReport}
                    loading={
                      dailyLoading ||
                      dateToDateLoading ||
                      returnLoading ||
                      dstLoading
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <ReportViewer
        title={title}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        reportData={reportDataView}
      />
    </form>
  );
};

export default GeneralReport;

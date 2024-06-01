import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../components/common/CustomAppBar";
import { useSelector } from "react-redux";
import SelectReport from "../../components/common/SelectReport";
import CustomAutocomplete from "../../components/inputs/CustomAutocomplete";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import ReportButton from "../../components/buttons/ReportButton";
import { errorToast } from "../../common/toaster/toaster";
import {
  useGetBuyerByCompanyQuery,
  useGetPoByStyleQuery,
  useGetStyleByBuyerQuery,
} from "../../redux/features/common/commonQuery";

import {
  useLazyGetDailyExportReportQuery,
  useLazyGetExportStyleWiseReportQuery,
} from "../../redux/features/export/report/queryExportReport";
import { useGetCompanyInfoQuery } from "../../redux/features/cutting/cutMaster/queryCutMaster";
import ReportViewer from "../../components/report/ReportViewer";

const ExportReport = () => {
  const { user } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToData] = useState(null);
  const [buyer, setBuyer] = useState(null);
  const [style, setStyle] = useState(null);
  const [po, setPo] = useState(null);

  const [fromDateDisable, setFromDateDisable] = useState(true);
  const [companyDisable, setCompanyDisable] = useState(true);
  const [toDateDisable, setToDateDisable] = useState(true);
  const [buyerDisable, setBuyerDisable] = useState(true);
  const [styleDisable, setStyleDisable] = useState(true);
  const [poDisable, setPoDisable] = useState(true);

  //get company
  const { data: companyData, isLoading: isCompanyLoading } =
    useGetCompanyInfoQuery();
  //get buyer
  const { data: buyerData, isLoading: isBuyerLoading } =
    useGetBuyerByCompanyQuery(company?.nCompanyID);
  //get style
  const { data: styleData, isLoading: isStyleLoading } =
    useGetStyleByBuyerQuery({
      id: company?.nCompanyID,
      buyer: buyer?.nBuyer_ID,
    });
  //get po by style
  const { data: poData, isLoading: isPoLoading } = useGetPoByStyleQuery(
    style?.nStyleID
  );

  // Get Daily Export Report Query
  const [
    getDailyReport,
    {
      data: dailyReportData,
      isSuccess: dailyReportSuccess,
      isFetching: dailyReportLoading,
      isError: dailyReportError,
    },
  ] = useLazyGetDailyExportReportQuery();

  // Get Export Style Wise Report Query
  const [
    getExportStyleWise,
    {
      data: exportStyleWiseReportData,
      isSuccess: exportStyleWiseReportSuccess,
      isFetching: exportStyleWiseReportLoading,
      isError: exportStyleWiseReportError,
    },
  ] = useLazyGetExportStyleWiseReportQuery();

  const handleReport = (e) => {
    e.preventDefault();
    if (title === "Daily Export Report") {
      getDailyReport({
        id: company?.nCompanyID,
        date: fromDate,
        user: user?.userName,
      });
    }
    if (title === "Closing Report By-Style Wise") {
      getExportStyleWise({
        id: company?.nCompanyID,
        style: style?.nStyleID,
        user: user?.userName,
      });
    }
  };

  useEffect(() => {
    if (dailyReportError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (dailyReportSuccess && dailyReportData) {
      setModalOpen(true);
      setReportDataView(dailyReportData);
    }
  }, [dailyReportError, dailyReportData, dailyReportSuccess]);
  useEffect(() => {
    if (exportStyleWiseReportError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (exportStyleWiseReportSuccess && exportStyleWiseReportData) {
      setModalOpen(true);
      setReportDataView(exportStyleWiseReportData);
    }
  }, [
    exportStyleWiseReportError,
    exportStyleWiseReportData,
    exportStyleWiseReportSuccess,
  ]);
  // reset input fields
  const resetInputField = () => {
    setCompany(null);
    setStyle(null);
    setFromDate(null);
    setToData(null);
    setBuyer(null);
    setPo(null);
  };
  useEffect(() => {
    if (title === "Daily Export Report") {
      setBuyerDisable(true);
      setCompanyDisable(false);
      setStyleDisable(true);
      setFromDateDisable(false);
      setToDateDisable(true);
      setPoDisable(true);
      resetInputField();
    } else if (title === "Closing Report By-Style Wise") {
      setCompanyDisable(false);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(false);
      setStyleDisable(false);
      setPoDisable(true);
      setCompany(null);
      resetInputField();
    } else {
      setCompanyDisable(true);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(true);
      setStyleDisable(true);
      setPoDisable(true);
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
                    label: "Daily Export Report",
                  },
                  {
                    value: "LocalAcceptanceHandOverListReport",
                    label: "Closing Report By-Style Wise",
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
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <CustomAutocomplete
                    // setValue={setValue}
                    label={"Company"}
                    optionLabel={"cCmpName"}
                    optionId={"nCompanyID"}
                    options={companyData ?? []} //company ? yearData ?? [] :
                    value={company}
                    loading={isCompanyLoading}
                    setSelectedValue={setCompany}
                    disabled={companyDisable}
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDatePicker
                    label={
                      title === "Daily Export Report" ? "Date" : "From Date"
                    }
                    name={"date"}
                    disableFuture={true}
                    //   prevDate={2}
                    //   futureDate={2}
                    value={fromDate}
                    setData={setFromDate}
                    disabled={fromDateDisable}
                    required={true}
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
                    setData={setToData}
                    disabled={toDateDisable}
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <CustomAutocomplete
                    // setValue={setValue}
                    label={"Buyer"}
                    optionLabel={"cBuyer_Name"}
                    optionId={"nBuyer_ID"}
                    value={buyer}
                    options={company ? buyerData ?? [] : []}
                    loading={isBuyerLoading}
                    setSelectedValue={setBuyer}
                    disabled={buyerDisable}
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    // setValue={setValue}
                    label={"Style"}
                    optionLabel={"cStyleNo"}
                    optionId={"nStyleID"}
                    options={buyer ? styleData ?? [] : []}
                    value={style}
                    loading={isStyleLoading}
                    setSelectedValue={setStyle}
                    disabled={styleDisable}
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    // setValue={setValue}
                    label={"PO"}
                    optionLabel={"pO_No"}
                    optionId={"pO_No"}
                    options={style ? poData ?? [] : []}
                    value={po}
                    loading={isPoLoading}
                    setSelectedValue={setPo}
                    disabled={poDisable}
                    required={true}
                  />
                </Grid>

                <Grid item xs={12}>
                  <ReportButton
                    title={"view report"}
                    type="submit"
                    fullWidth
                    loading={dailyReportLoading || exportStyleWiseReportLoading}
                    disabled={title === ""}
                    // handleClick={}
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

export default ExportReport;

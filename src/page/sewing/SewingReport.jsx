import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../components/common/CustomAppBar";
import SelectReport from "../../components/common/SelectReport";
import CustomAutocomplete from "../../components/inputs/CustomAutocomplete";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import { useSelector } from "react-redux";
import {
  useGetBuyerByCompanyQuery,
  useGetCompanyByUserQuery,
  useGetPoByStyleQuery,
  useGetStyleByBuyerQuery,
} from "../../redux/features/common/commonQuery";
import ReportButton from "../../components/buttons/ReportButton";
import {
  useLazyGetDailySewingReportQuery,
  useLazyGetNoScanBarcodeReportQuery,
  useLazyGetSeeingReportDailyVarianceQuery,
  useLazyGetSewingClosingReportStyleWiseQuery,
  useLazyGetSewingReportPoWiseQuery,
  useLazyGetSewingReportStyleAndPoWiseQuery,
  useLazyGetSewingReportStyleWiseQuery,
} from "../../redux/features/report/queryReport";
import { errorToast, infoToast } from "../../common/toaster/toaster";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import ReportViewer from "../../components/report/ReportViewer";
const SewingReport = () => {
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
  const [reportType, setReportType] = useState({ id: 1, name: "PDF" });
  const [challan, setChallan] = useState("");
  const [fromDateDisable, setFromDateDisable] = useState(true);
  const [companyDisable, setCompanyDisable] = useState(true);
  const [toDateDisable, setToDateDisable] = useState(true);
  const [buyerDisable, setBuyerDisable] = useState(true);
  const [styleDisable, setStyleDisable] = useState(true);
  const [poDisable, setPoDisable] = useState(true);
  const [challanDisable, setChallanDisable] = useState(true);
  const [reportTypeDisable, setReportTypeDisable] = useState(true);

  //get company
  const { data: companyData, isLoading: isCompanyLoading } =
    useGetCompanyByUserQuery(user?.companyID);

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

  // =================================================================
  // daily sewing report
  const [
    getDailyReport,
    {
      data: dailyReport,
      isFetching: dailyLoading,
      isError: dailyError,
      isSuccess: dailySuccess,
    },
  ] = useLazyGetDailySewingReportQuery();
  // style wise report
  const [
    getStyleWiseReport,
    {
      data: styleWiseReport,
      isFetching: styleWiseLoading,
      isError: styleWiseError,
      isSuccess: styleWiseSuccess,
    },
  ] = useLazyGetSewingReportStyleWiseQuery();
  // closing style wise report
  const [
    getClosingStyleWiseReport,
    {
      data: closingStyleWiseReport,
      isFetching: closingStyleWiseLoading,
      isError: closingStyleWiseError,
      isSuccess: closingStyleWiseSuccess,
    },
  ] = useLazyGetSewingClosingReportStyleWiseQuery();
  // po wise report
  const [
    getPoWiseReport,
    {
      data: poReport,
      isFetching: poLoading,
      isError: poError,
      isSuccess: poSuccess,
    },
  ] = useLazyGetSewingReportPoWiseQuery();
  // style and po wise report
  const [
    getStylePoWiseReport,
    {
      data: stylePoReport,
      isFetching: stylePoLoading,
      isError: stylePoError,
      isSuccess: stylePoSuccess,
    },
  ] = useLazyGetSewingReportStyleAndPoWiseQuery();
  // variance report
  const [
    getVarianceReport,
    {
      data: varianceReport,
      isFetching: varianceLoading,
      isError: varianceError,
      isSuccess: varianceSuccess,
    },
  ] = useLazyGetSeeingReportDailyVarianceQuery();
  // noScanBarcode report
  const [
    getNoScanBarcodeReport,
    {
      data: noScanBarcodeReport,
      isFetching: noScanBarcodeLoading,
      isError: noScanBarcodeError,
      isSuccess: noScanBarcodeSuccess,
    },
  ] = useLazyGetNoScanBarcodeReportQuery();

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
  // style wise reports effect
  useEffect(() => {
    if (styleWiseError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (styleWiseReport && styleWiseSuccess) {
      setModalOpen(true);
      setReportDataView(styleWiseReport);
    }
  }, [styleWiseError, styleWiseSuccess, styleWiseReport]);
  // closing style wise reports effect
  useEffect(() => {
    if (closingStyleWiseError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (closingStyleWiseReport && closingStyleWiseSuccess) {
      setModalOpen(true);
      setReportDataView(closingStyleWiseReport);
    }
  }, [closingStyleWiseError, closingStyleWiseSuccess, closingStyleWiseReport]);
  // po wise reports effect
  useEffect(() => {
    if (poError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (poReport && poSuccess) {
      setModalOpen(true);
      setReportDataView(poReport);
    }
  }, [poError, poSuccess, poReport]);
  // style and po wise reports effect
  useEffect(() => {
    if (stylePoError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (stylePoReport && stylePoSuccess) {
      setModalOpen(true);
      setReportDataView(stylePoReport);
    }
  }, [stylePoError, stylePoSuccess, stylePoReport]);
  // variance reports effect
  useEffect(() => {
    if (varianceError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (varianceReport && varianceSuccess) {
      setModalOpen(true);
      setReportDataView(varianceReport);
    }
  }, [varianceError, varianceSuccess, varianceReport]);
  // noScanBarcode reports effect
  useEffect(() => {
    if (noScanBarcodeError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (noScanBarcodeReport && noScanBarcodeSuccess) {
      setModalOpen(true);
      setReportDataView(noScanBarcodeReport);
    }
  }, [noScanBarcodeError, noScanBarcodeSuccess, noScanBarcodeReport]);

  // =================================================================
  console.log(reportType);
  const handleReport = (e) => {
    e.preventDefault();
    if (title === "Daily Sewing Report") {
      getDailyReport({
        id: company?.nCompanyID,
        date: fromDate,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Sewing Report- Style Wise") {
      getStyleWiseReport({
        id: company?.nCompanyID,
        styleId: style?.nStyleID,
        style: style?.cStyleNo,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Sewing Closing Report- Style Wise") {
      getClosingStyleWiseReport({
        id: company?.nCompanyID,
        styleId: style?.nStyleID,
        style: style?.cStyleNo,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Sewing Report- Style and PO Wise") {
      getStylePoWiseReport({
        id: company?.nCompanyID,
        styleId: style?.nStyleID,
        style: style?.cStyleNo,
        poID: po?.poLot,
        PONo: po?.pO_No,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Sewing Report- PO Wise") {
      getPoWiseReport({
        id: company?.nCompanyID,
        styleId: style?.nStyleID,
        style: style?.cStyleNo,
        poID: po?.poLot,
        PONo: po?.pO_No,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Daily Production Variance Report") {
      getVarianceReport({
        id: company?.nCompanyID,
        date: fromDate,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Print No Scan Barcode") {
      getNoScanBarcodeReport({
        id: company?.nCompanyID,
        challan: challan,
        type: reportType?.name,
        user: user?.userName,
      });
    } else {
      infoToast("Please Select a Report");
    }
  };
  // reset input fields
  const resetInputField = () => {
    setCompany(null);
    setStyle(null);
    setFromDate(null);
    setToData(null);
    setBuyer(null);
    setPo(null);
    setChallan("");
  };
  useEffect(() => {
    if (
      title === "Sewing Closing Report- Style Wise" ||
      title === "Sewing Report- Style Wise"
    ) {
      setBuyerDisable(false);
      setCompanyDisable(false);
      setStyleDisable(false);
      setFromDateDisable(true);
      setToDateDisable(true);
      setPoDisable(true);
      setChallanDisable(true);
      setReportTypeDisable(false);
      resetInputField();
    } else if (title === "Daily Sewing Report") {
      setCompanyDisable(false);
      setFromDateDisable(false);
      setToDateDisable(true);
      setBuyerDisable(true);
      setStyleDisable(true);
      setPoDisable(true);
      setChallanDisable(true);
      setReportTypeDisable(true);

      resetInputField();
    } else if (
      title === "Sewing Report- Style and PO Wise" ||
      title === "Sewing Report- PO Wise"
    ) {
      setBuyerDisable(false);
      setCompanyDisable(false);
      setStyleDisable(false);
      setPoDisable(false);
      setFromDateDisable(true);
      setToDateDisable(true);
      setChallanDisable(true);
      setReportTypeDisable(true);
      resetInputField();
    } else if (title === "Daily Production Variance Report") {
      setCompanyDisable(false);
      setFromDateDisable(false);
      setToDateDisable(true);
      setBuyerDisable(true);
      setStyleDisable(true);
      setPoDisable(true);
      setChallanDisable(true);
      setReportTypeDisable(false);
      resetInputField();
    } else if (title === "Print No Scan Barcode") {
      setCompanyDisable(false);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(true);
      setStyleDisable(true);
      setPoDisable(true);
      setChallanDisable(false);
      setReportTypeDisable(true);
      resetInputField();
    } else {
      setCompanyDisable(true);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(true);
      setStyleDisable(true);
      setPoDisable(true);
      setChallanDisable(true);
      setReportTypeDisable(true);
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
          <Grid item xs={12} sm={7}>
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
                    label: "Daily Sewing Report",
                  },
                  // {
                  //   value: "PaymentModeWiseMonthlyReport",
                  //   label: "Sewing Summary By-D2D",
                  // },
                  {
                    value: "LocalAcceptanceHandOverListReport",
                    label: "Sewing Report- Style Wise",
                  },
                  {
                    value: "LocalAcceptanceDocumentListReport",
                    label: "Sewing Report- PO Wise",
                  },
                  {
                    value: "RealizedAmountDetails",
                    label: "Sewing Closing Report- Style Wise",
                  },
                  {
                    value: "FTT_FDD_RTGS_Details",
                    label: "Sewing Report- Style and PO Wise",
                  },
                  {
                    value: "FTT_FDD_RTGS_Detailsq",
                    label: "Daily Production Variance Report",
                  },
                  // {
                  //   value: "printNoScanBarcode",
                  //   label: "Print No Scan Barcode",
                  // },
                ]}
                id="reportName"
                title="Report Name"
                setTitle={setTitle}
              />
            </Box>
          </Grid>
          {/* parameter */}
          <Grid item xs={12} sm={5}>
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
                    // setValue={setValue}
                    label={"Company"}
                    options={companyData ?? []} //company ? yearData ?? [] :
                    value={company}
                    optionLabel={"cCmpName"}
                    optionId={"nCompanyID"}
                    loading={isCompanyLoading}
                    setSelectedValue={setCompany}
                    required={true}
                    disabled={companyDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDatePicker
                    label={
                      title === "Daily Sewing Report" ? "Date" : "From Date"
                    }
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
                    setData={setToData}
                    required={true}
                    disabled={toDateDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    // setValue={setValue}
                    label={"Buyer"}
                    options={company ? buyerData ?? [] : []}
                    value={buyer}
                    optionLabel={"cBuyer_Name"}
                    optionId={"nBuyer_ID"}
                    loading={isBuyerLoading}
                    setSelectedValue={setBuyer}
                    required={true}
                    disabled={buyerDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    // setValue={setValue}
                    label={"Style"}
                    options={buyer ? styleData ?? [] : []}
                    value={style}
                    optionLabel={"cStyleNo"}
                    optionId={"nStyleID"}
                    loading={isStyleLoading}
                    setSelectedValue={setStyle}
                    required={true}
                    disabled={styleDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    // setValue={setValue}
                    label={"PO"}
                    options={style ? poData ?? [] : []}
                    value={po}
                    optionLabel={"pO_No"}
                    optionId={"pO_No"}
                    loading={isPoLoading}
                    setSelectedValue={setPo}
                    required={true}
                    disabled={poDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextInput
                    label={"Challan Number"}
                    value={challan}
                    setStateValue={setChallan}
                    required={true}
                    disabled={challanDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomAutocomplete
                    // setValue={setValue}
                    label={"Report Type"}
                    options={[
                      { id: 1, name: "PDF" },
                      { id: 2, name: "EXCEL" },
                      { id: 3, name: "WORD" },
                    ]}
                    value={reportType}
                    optionLabel={"name"}
                    optionId={"id"}
                    setSelectedValue={setReportType}
                    required={true}
                    // disabled={reportTypeDisable}
                  />
                </Grid>

                <Grid item xs={12}>
                  <ReportButton
                    title={"view report"}
                    type="submit"
                    fullWidth={true}
                    // handleClick={}
                    loading={
                      dailyLoading ||
                      styleWiseLoading ||
                      closingStyleWiseLoading ||
                      poLoading ||
                      stylePoLoading ||
                      varianceLoading ||
                      noScanBarcodeLoading
                    }
                    disabled={title === ""}
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

export default SewingReport;

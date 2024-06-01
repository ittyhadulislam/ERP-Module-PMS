import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../components/common/CustomAppBar";
import SelectReport from "../../components/common/SelectReport";
import CustomAutocomplete from "../../components/inputs/CustomAutocomplete";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import {
  useLazyGetCuttingReportPoWiseQuery,
  useLazyGetCuttingReportStylePoLayQuery,
  useLazyGetCuttingReportStyleWiseClosingQuery,
  useLazyGetCuttingReportStyleWiseQuery,
  useLazyGetCuttingSummeryD2DReportQuery,
  useLazyGetDailyCuttingReportQuery,
} from "../../redux/features/report/queryReport";
import ReportButton from "../../components/buttons/ReportButton";
import { useSelector } from "react-redux";
import {
  useGetBuyerByCompanyQuery,
  useGetCompanyByUserQuery,
  useGetLayByStyleAndPoQuery,
  useGetStyleByBuyerQuery,
} from "../../redux/features/common/commonQuery";
import { errorToast, infoToast } from "../../common/toaster/toaster";
import { useGetLayRatioPoQuery } from "../../redux/features/cutting/cuttingLayRatio/queryCuttngLayRatio";
import ReportViewer from "../../components/report/ReportViewer";

const CuttingReport = () => {
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
  const [lay, setLay] = useState(null);
  const [reportType, setReportType] = useState({ id: 1, name: "PDF" });
  const [fromDateDisable, setFromDateDisable] = useState(true);
  const [companyDisable, setCompanyDisable] = useState(true);
  const [toDateDisable, setToDateDisable] = useState(true);
  const [buyerDisable, setBuyerDisable] = useState(true);
  const [styleDisable, setStyleDisable] = useState(true);
  const [poDisable, setPoDisable] = useState(true);
  const [layDisable, setLayDisable] = useState(true);

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
  //get po
  const { data: poData, isLoading: isPoLoading } = useGetLayRatioPoQuery(
    style?.nStyleID
  );
  //get lay
  const { data: layData, isLoading: isLayLoading } = useGetLayByStyleAndPoQuery(
    { style: style?.nStyleID, po: po?.cPoNum }
  );
  // =================================================================
  // daily cutting report
  const [
    getDailyReport,
    {
      data: dailyReport,
      isFetching: dailyLoading,
      isError: dailyError,
      isSuccess: dailySuccess,
    },
  ] = useLazyGetDailyCuttingReportQuery();
  // summary by D2D report
  const [
    getD2DReport,
    {
      data: d2dReport,
      isFetching: d2dLoading,
      isError: d2dError,
      isSuccess: d2dSuccess,
    },
  ] = useLazyGetCuttingSummeryD2DReportQuery();
  // style wise report
  const [
    getStyleWiseReport,
    {
      data: styleWiseReport,
      isFetching: styleWiseLoading,
      isError: styleWiseError,
      isSuccess: styleWiseSuccess,
    },
  ] = useLazyGetCuttingReportStyleWiseQuery();

  // po wise report
  const [
    getPoWiseReport,
    {
      data: poReport,
      isFetching: poLoading,
      isError: poError,
      isSuccess: poSuccess,
    },
  ] = useLazyGetCuttingReportPoWiseQuery();
  // lay wise report
  const [
    getLayWiseReport,
    {
      data: layWiseReport,
      isFetching: layWiseLoading,
      isError: layWiseError,
      isSuccess: layWiseSuccess,
    },
  ] = useLazyGetCuttingReportStylePoLayQuery();

  const [
    getCutToInputReport,
    {
      data: cutToInputReport,
      isFetching: cutToInputLoading,
      isError: cutToInputError,
      isSuccess: cutToInputSuccess,
    },
  ] = useLazyGetCuttingReportStyleWiseClosingQuery();

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

  // d2d reports effect
  useEffect(() => {
    if (d2dError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (d2dReport && d2dSuccess) {
      setModalOpen(true);
      setReportDataView(d2dReport);
    }
  }, [d2dError, d2dSuccess, d2dReport]);
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
  // lay wise reports effect
  useEffect(() => {
    if (layWiseError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (layWiseReport && layWiseSuccess) {
      setModalOpen(true);
      setReportDataView(layWiseReport);
    }
  }, [layWiseError, layWiseSuccess, layWiseReport]);
  // cut to input reports effect
  useEffect(() => {
    if (cutToInputError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (cutToInputReport && cutToInputSuccess) {
      setModalOpen(true);
      setReportDataView(cutToInputReport);
    }
  }, [cutToInputError, cutToInputSuccess, cutToInputReport]);
  // =================================================================

  const handleReport = (e) => {
    e.preventDefault();
    if (title === "Daily Cutting Report") {
      getDailyReport({
        id: company?.nCompanyID,
        date: fromDate,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Cutting Summary By-D2D") {
      getD2DReport({
        id: company?.nCompanyID,
        fromDate: fromDate,
        toDate: toDate,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Cutting Report- Style Wise") {
      getStyleWiseReport({
        id: company?.nCompanyID,
        styleId: style?.nStyleID,
        style: style?.cStyleNo,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Cutting Report- PO Wise") {
      getPoWiseReport({
        id: company?.nCompanyID,
        styleId: style?.nStyleID,
        style: style?.cStyleNo,
        poId: po?.cOrderNu,
        po: po?.cPoNum,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Style Wise Closing- Cut To Input Report") {
      getCutToInputReport({
        id: company?.nCompanyID,
        styleId: style?.nStyleID,
        style: style?.cStyleNo,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Cutting Report-Lay Wise") {
      getLayWiseReport({
        id: company?.nCompanyID,
        style: style?.nStyleID,
        po: po?.cOrderNu,
        lay: lay?.cLayNo,
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
    setLay(null);
  };
  useEffect(() => {
    if (title === "Daily Cutting Report") {
      setCompanyDisable(false);
      setFromDateDisable(false);
      setToDateDisable(true);
      setBuyerDisable(true);
      setStyleDisable(true);
      setPoDisable(true);
      setLayDisable(true);
      resetInputField();
    } else if (title === "Cutting Summary By-D2D") {
      setCompanyDisable(false);
      setFromDateDisable(false);
      setToDateDisable(false);
      setBuyerDisable(true);
      setStyleDisable(true);
      setPoDisable(true);
      setLayDisable(true);
      resetInputField();
    } else if (
      title === "Cutting Report- Style Wise" ||
      title === "Style Wise Closing- Cut To Input Report"
    ) {
      setCompanyDisable(false);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(false);
      setStyleDisable(false);
      setPoDisable(true);
      setLayDisable(true);
      resetInputField();
    } else if (title === "Cutting Report- PO Wise") {
      setCompanyDisable(false);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(false);
      setStyleDisable(false);
      setPoDisable(false);
      setLayDisable(true);
      resetInputField();
    } else if (title === "Cutting Report-Lay Wise") {
      setCompanyDisable(false);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(false);
      setStyleDisable(false);
      setPoDisable(false);
      setLayDisable(false);
      resetInputField();
    } else {
      setCompanyDisable(true);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(true);
      setStyleDisable(true);
      setPoDisable(true);
      setLayDisable(true);
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
                    label: "Daily Cutting Report",
                  },
                  {
                    value: "PaymentModeWiseMonthlyReport",
                    label: "Cutting Summary By-D2D",
                  },
                  {
                    value: "LocalAcceptanceHandOverListReport",
                    label: "Cutting Report- Style Wise",
                  },
                  {
                    value: "LocalAcceptanceDocumentListReport",
                    label: "Cutting Report- PO Wise",
                  },
                  {
                    value: "RealizedAmountDetails",
                    label: "Cutting Report-Lay Wise",
                  },
                  {
                    value: "FTT_FDD_RTGS_Details",
                    label: "Style Wise Closing- Cut To Input Report",
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
                      title === "Daily Cutting Report" ? "Date" : "From Date"
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
                    optionLabel={"cPoNum"}
                    optionId={"cOrderNu"}
                    loading={isPoLoading}
                    setSelectedValue={setPo}
                    required={true}
                    disabled={poDisable}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomAutocomplete
                    // setValue={setValue}
                    label={"Lay"}
                    options={po ? layData ?? [] : []}
                    value={lay}
                    optionLabel={"cLayNo"}
                    optionId={"cLayNo"}
                    loading={isLayLoading}
                    setSelectedValue={setLay}
                    required={true}
                    disabled={layDisable}
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
                      d2dLoading ||
                      styleWiseLoading ||
                      poLoading ||
                      layWiseLoading ||
                      cutToInputLoading
                    }
                    // disabled={selectedRow.length <= 0 || showApproval}
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

export default CuttingReport;

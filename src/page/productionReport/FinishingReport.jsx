import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../components/common/CustomAppBar";
import { useSelector } from "react-redux";
import SelectReport from "../../components/common/SelectReport";
import CustomAutocomplete from "../../components/inputs/CustomAutocomplete";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import ReportButton from "../../components/buttons/ReportButton";
import { useLazyGetDailyFinishingReportQuery } from "../../redux/features/finishing/report/queryFinishingReport";
import { errorToast, infoToast } from "../../common/toaster/toaster";
import {
  useGetBuyerByCompanyQuery,
  useGetPoByStyleQuery,
  useGetStyleByBuyerQuery,
} from "../../redux/features/common/commonQuery";
import {
  useLazyGetSewingReportCountryWiseQuery,
  useLazyGetSewingReportPoWiseQuery,
  useLazyGetSewingReportStyleWiseQuery,
} from "../../redux/features/report/queryReport";
import { useGetCompanyInfoQuery } from "../../redux/features/cutting/cutMaster/queryCutMaster";
import { useGetFinishingCountryQuery } from "../../redux/features/finishing/finishing/queryFinishing";
import ReportViewer from "../../components/report/ReportViewer";

const FinishingReport = () => {
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
  const [country, setCountry] = useState(null);

  const [fromDateDisable, setFromDateDisable] = useState(true);
  const [companyDisable, setCompanyDisable] = useState(true);
  const [toDateDisable, setToDateDisable] = useState(true);
  const [buyerDisable, setBuyerDisable] = useState(true);
  const [styleDisable, setStyleDisable] = useState(true);
  const [poDisable, setPoDisable] = useState(true);
  const [countryDisable, setCountryDisable] = useState(true);

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
  //get Country data
  const { data: countryData, isLoading: isCountryLoading } =
    useGetFinishingCountryQuery({
      id: company?.nCompanyID,
      style: style?.nStyleID,
      po: po?.poLot,
    });

  // =================================================================
  // daily finishing report
  const [
    getDailyReport,
    {
      data: dailyReport,
      isFetching: dailyLoading,
      isError: dailyError,
      isSuccess: dailySuccess,
    },
  ] = useLazyGetDailyFinishingReportQuery();
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
  // country wise report
  const [
    getCountryWiseReport,
    {
      data: countryReport,
      isFetching: coutryLoading,
      isError: countryError,
      isSuccess: countrySuccess,
    },
  ] = useLazyGetSewingReportCountryWiseQuery();

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
  // country wise reports effect
  useEffect(() => {
    if (countryError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (countryReport && countrySuccess) {
      setModalOpen(true);
      setReportDataView(countryReport);
    }
  }, [countryError, countrySuccess, countryReport]);
  // =================================================================

  const handleReport = (e) => {
    e.preventDefault();

    if (title === "Daily Finishing Report") {
      getDailyReport({
        id: company?.nCompanyID,
        date: fromDate,
        user: user?.userName,
      });
    } else if (title === "Finishing Report- Style Wise") {
      getStyleWiseReport({
        id: company?.nCompanyID,
        styleId: style?.nStyleID,
        style: style?.cStyleNo,
        user: user?.userName,
      });
    } else if (title === "Finishing Report- PO Wise") {
      getPoWiseReport({
        id: company?.nCompanyID,
        styleId: style?.nStyleID,
        style: style?.cStyleNo,
        poID: po?.poLot,
        PONo: po?.pO_No,
        user: user?.userName,
      });
    } else if (title === "Finishing Report- Country Wise") {
      getCountryWiseReport({
        id: company?.nCompanyID,
        styleId: style?.nStyleID,
        style: style?.cStyleNo,
        poID: po?.poLot,
        PONo: po?.pO_No,
        countryId: country?.nConCode,
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
  };

  useEffect(() => {
    if (title === "Daily Finishing Report") {
      setBuyerDisable(true);
      setCompanyDisable(false);
      setStyleDisable(true);
      setFromDateDisable(false);
      setToDateDisable(true);
      setPoDisable(true);
      setCountryDisable(true);
      resetInputField();
    } else if (title === "Finishing Report- Style Wise") {
      setCompanyDisable(false);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(false);
      setStyleDisable(false);
      setPoDisable(true);
      setCountryDisable(true);
      resetInputField();
    } else if (title === "Finishing Report- PO Wise") {
      setCompanyDisable(false);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(false);
      setStyleDisable(false);
      setPoDisable(false);
      setCountryDisable(true);
      resetInputField();
    } else if (title === "Finishing Report- Country Wise") {
      setCompanyDisable(false);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(false);
      setStyleDisable(false);
      setPoDisable(false);
      setCountryDisable(false);
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
                    label: "Daily Finishing Report",
                  },
                  // {
                  //   value: "PaymentModeWiseMonthlyReport",
                  //   label: "Finishing Summary By-D2D",
                  // },
                  {
                    value: "LocalAcceptanceHandOverListReport",
                    label: "Finishing Report- Style Wise",
                  },
                  {
                    value: "LocalAcceptanceDocumentListReport",
                    label: "Finishing Report- PO Wise",
                  },
                  {
                    value: "LocalAcceptanceDocumentListReport1",
                    label: "Finishing Report- Country Wise",
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
                      title === "Daily Finishing Report" ? "Date" : "From Date"
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  <CustomAutocomplete
                    // setValue={setValue}
                    label={"Country"}
                    options={po ? countryData ?? [] : []}
                    value={country}
                    optionLabel={"cConDes"}
                    optionId={"nConCode"}
                    loading={isCountryLoading}
                    setSelectedValue={setCountry}
                    disabled={countryDisable}
                    required={true}
                  />
                </Grid>

                <Grid item xs={12}>
                  <ReportButton
                    title={"view report"}
                    type="submit"
                    fullWidth
                    loading={dailyLoading || styleWiseLoading || poLoading}
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

export default FinishingReport;

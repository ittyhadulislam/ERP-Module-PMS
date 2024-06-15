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
import { errorToast, infoToast } from "../../common/toaster/toaster";
import {
  useLazyGetDailyInputReportQuery,
  useLazyGetInputReportFloorLineWiseQuery,
  useLazyGetInputReportPoLineWiseQuery,
  useLazyGetInputReportPoWiseQuery,
  useLazyGetInputReportStyleWiseQuery,
  useLazyGetInputSummeryByD2DReportQuery,
  useLazyGetInputWipReportQuery,
} from "../../redux/features/report/queryReport";
import { useGetInputFloorQuery } from "../../redux/features/cutting/inputCutPanel/queryInputCutPanel";
import ReportViewer from "../../components/report/ReportViewer";

const InputReport = () => {
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
  const [floor, setFloor] = useState(null);
  const [reportType, setReportType] = useState({ id: 1, name: "PDF" });
  const [fromDateDisable, setFromDateDisable] = useState(true);
  const [companyDisable, setCompanyDisable] = useState(true);
  const [toDateDisable, setToDateDisable] = useState(true);
  const [buyerDisable, setBuyerDisable] = useState(true);
  const [styleDisable, setStyleDisable] = useState(true);
  const [poDisable, setPoDisable] = useState(true);
  const [floorDisable, setFloorDisable] = useState(true);
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
  //get po
  const { data: poData, isLoading: isPoLoading } = useGetPoByStyleQuery(
    style?.nStyleID
  );
  //get Floor data
  const { data: floorData, isLoading: isFloorLoading } = useGetInputFloorQuery(
    company?.nCompanyID
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
  ] = useLazyGetDailyInputReportQuery();
  // wip report
  const [
    getDailyWipReport,
    {
      data: dailyWipReport,
      isFetching: dailyWipLoading,
      isError: dailyWipError,
      isSuccess: dailyWipSuccess,
    },
  ] = useLazyGetInputWipReportQuery();
  // summary by D2D report
  const [
    getD2DReport,
    {
      data: d2dReport,
      isFetching: d2dLoading,
      isError: d2dError,
      isSuccess: d2dSuccess,
    },
  ] = useLazyGetInputSummeryByD2DReportQuery();
  // style wise report
  const [
    getStyleWiseReport,
    {
      data: styleWiseReport,
      isFetching: styleWiseLoading,
      isError: styleWiseError,
      isSuccess: styleWiseSuccess,
    },
  ] = useLazyGetInputReportStyleWiseQuery();
  // po wise report
  const [
    getPoWiseReport,
    {
      data: poReport,
      isFetching: poLoading,
      isError: poError,
      isSuccess: poSuccess,
    },
  ] = useLazyGetInputReportPoWiseQuery();
  // po line wise report
  const [
    getPoLineWiseReport,
    {
      data: poLineReport,
      isFetching: poLineLoading,
      isError: poLineError,
      isSuccess: poLineSuccess,
    },
  ] = useLazyGetInputReportPoLineWiseQuery();
  // po line wise report
  const [
    getFloorLineWiseReport,
    {
      data: floorLineReport,
      isFetching: floorLineLoading,
      isError: floorLineError,
      isSuccess: floorLineSuccess,
    },
  ] = useLazyGetInputReportFloorLineWiseQuery();

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
  // wip report effect
  useEffect(() => {
    if (dailyWipError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (dailyWipSuccess && dailyWipReport) {
      setModalOpen(true);
      setReportDataView(dailyWipReport);
    }
  }, [dailyWipError, dailyWipSuccess, dailyWipReport]);
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
  // po line wise reports effect
  useEffect(() => {
    if (poLineError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (poLineReport && poLineSuccess) {
      setModalOpen(true);
      setReportDataView(poLineReport);
    }
  }, [poLineError, poLineSuccess, poLineReport]);
  // Floor line wise reports effect
  useEffect(() => {
    if (floorLineError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (floorLineReport && floorLineSuccess) {
      setModalOpen(true);
      setReportDataView(floorLineReport);
    }
  }, [floorLineError, floorLineSuccess, floorLineReport]);

  // =================================================================

  const handleReport = (e) => {
    e.preventDefault();
    if (title === "Line Wise Input Report-Daily") {
      getDailyReport({
        id: company?.nCompanyID,
        date: fromDate,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Input To Sewing WIP Report-Daily") {
      getDailyWipReport({
        id: company?.nCompanyID,
        date: fromDate,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Input Summary By-D2D") {
      getD2DReport({
        id: company?.nCompanyID,
        fromDate: fromDate,
        toDate: toDate,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Input Report- Style Wise") {
      getStyleWiseReport({
        id: company?.nCompanyID,
        styleID: style?.nStyleID,
        style: style?.cStyleNo,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Input Report- PO Wise") {
      getPoWiseReport({
        id: company?.nCompanyID,
        styleID: style?.nStyleID,
        style: style?.cStyleNo,
        pono: po?.pO_No,
        poID: po?.poLot,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Input Report- Style, PO And Line Wise") {
      getPoLineWiseReport({
        id: company?.nCompanyID,
        styleID: style?.nStyleID,
        style: style?.cStyleNo,
        pono: po?.pO_No,
        poID: po?.poLot,
        type: reportType?.name,
        user: user?.userName,
      });
    } else if (title === "Daily Input Report- Floor, Line Wise") {
      getFloorLineWiseReport({
        id: company?.nCompanyID,
        floorID: floor?.nFloor,
        floor: floor?.cFloor_Descriptin,
        date: fromDate,
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
    setFloor(null);
  };
  useEffect(() => {
    if (
      title === "Line Wise Input Report-Daily" ||
      title === "Input To Sewing WIP Report-Daily"
    ) {
      setCompanyDisable(false);
      setFromDateDisable(false);
      setToDateDisable(true);
      setBuyerDisable(true);
      setStyleDisable(true);
      setPoDisable(true);
      setFloorDisable(true);
      setReportTypeDisable(false);
      resetInputField();
    } else if (title === "Input Summary By-D2D") {
      setCompanyDisable(false);
      setFromDateDisable(false);
      setToDateDisable(false);
      setBuyerDisable(true);
      setStyleDisable(true);
      setPoDisable(true);
      setFloorDisable(true);
      setReportTypeDisable(false);
      resetInputField();
    } else if (title === "Input Report- Style Wise") {
      setCompanyDisable(false);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(false);
      setStyleDisable(false);
      setPoDisable(true);
      setFloorDisable(true);
      setReportTypeDisable(false);
      resetInputField();
    } else if (
      title === "Input Report- PO Wise" ||
      title === "Input Report- Style, PO And Line Wise"
    ) {
      setCompanyDisable(false);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(false);
      setStyleDisable(false);
      setPoDisable(false);
      setFloorDisable(true);
      setReportTypeDisable(false);
      resetInputField();
    } else if (title === "Daily Input Report- Floor, Line Wise") {
      setCompanyDisable(false);
      setFromDateDisable(false);
      setToDateDisable(true);
      setBuyerDisable(true);
      setStyleDisable(true);
      setPoDisable(true);
      setFloorDisable(false);
      setReportTypeDisable(false);
      resetInputField();
    } else {
      setCompanyDisable(true);
      setFromDateDisable(true);
      setToDateDisable(true);
      setBuyerDisable(true);
      setStyleDisable(true);
      setPoDisable(true);
      setFloorDisable(true);
      setReportTypeDisable(false);
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
                    label: "Line Wise Input Report-Daily",
                  },
                  {
                    value: "PaymentModeWiseMonthlyReport",
                    label: "Input Report- Style Wise",
                  },
                  {
                    value: "LocalAcceptanceHandOverListReport",
                    label: "Input To Sewing WIP Report-Daily",
                  },
                  {
                    value: "LocalAcceptanceDocumentListReport",
                    label: "Input Report- PO Wise",
                  },
                  {
                    value: "RealizedAmountDetails",
                    label: "Input Summary By-D2D",
                  },
                  {
                    value: "FTT_FDD_RTGS_Detailsw",
                    label: "Input Report- Style, PO And Line Wise",
                  },
                  {
                    value: "FTT_FDD_RTGS_Details",
                    label: "Daily Input Report- Floor, Line Wise",
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
                      title === "Line Wise Input Report-Daily" ||
                        title === "Input To Sewing WIP Report-Daily"
                        ? "Date"
                        : "From Date"
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
                  <CustomAutocomplete
                    // setValue={setValue}
                    label={"Floor"}
                    options={floorData ?? []}
                    value={floor}
                    optionLabel={"cFloor_Descriptin"}
                    optionId={"nFloor"}
                    loading={isFloorLoading}
                    setSelectedValue={setFloor}
                    disabled={floorDisable}
                    required={true}
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
                    disabled={reportTypeDisable}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ReportButton
                    title={"view report"}
                    type="submit"
                    fullWidth
                    // handleClick={}
                    loading={
                      dailyLoading ||
                      dailyWipLoading ||
                      d2dLoading ||
                      styleWiseLoading ||
                      poLoading ||
                      poLineLoading ||
                      floorLineLoading
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

export default InputReport;

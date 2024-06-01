import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomDatePicker from "../inputs/CustomDatePicker";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomTextInput from "../inputs/CustomTextInput";
import { useSelector } from "react-redux";
import {
  useGetSewingColorQuery,
  useGetSewingCountryQuery,
  useGetSewingHourlyProdQuery,
  useGetSewingLineQuery,
  useGetSewingPoQuery,
  useGetSewingReportDailyLineStageWiseQuery,
  useGetSewingShipOutQuery,
  useGetSewingSizeQuery,
  useGetSewingStyleQuery,
} from "../../redux/features/sewing/sewingProduction/querySewingProduction";
import { successToast, warningToast } from "../../common/toaster/toaster";
import ReportButton from "../buttons/ReportButton";
import SubmitButton from "../buttons/SubmitButton";
import {
  useActiveSewingProductionMutation,
  useInActiveSewingProductionMutation,
  useSaveSewingProductionMutation,
} from "../../redux/features/sewing/sewingProduction/mutationSewingProduction";
import { LoadingButton } from "@mui/lab";
import { BsBarChartSteps } from "react-icons/bs";
import ReportModal from "../report/ReportModal";
import { useGetFabricBuyerQuery } from "../../redux/features/cutting/fabric/queryFabric";
import ReturnButton from "../buttons/ReturnButton";
import ReportViewer from "../report/ReportViewer";

const SewingProductionInput = () => {
  const { user } = useSelector((state) => state.auth);
  const [style, setStyle] = useState(null);
  const [po, setPo] = useState(null);
  const [country, setCountry] = useState(null);
  const [color, setColor] = useState(null);
  const [line, setLine] = useState(null);
  const [hour, setHour] = useState("");
  const [date, setDate] = useState(null);
  const [size, setSize] = useState(null);
  const [sewingQty, setSewingQty] = useState("");
  const [hourlyProd, setHourlyProd] = useState(null);
  const [buyer, setBuyer] = useState(null);
  const [modalStyle, setModalStyle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //get style
  const { data: styleData, isLoading: isStyleLoading } = useGetSewingStyleQuery(
    user?.companyID
  );
  //get po
  const { data: poData, isLoading: isPoLoading } = useGetSewingPoQuery(
    style?.nStyleID
  );
  //get country
  const { data: countryData, isLoading: isCountryLoading } =
    useGetSewingCountryQuery({ style: style?.nStyleID, po: po?.cOrderNu });
  //get color
  const { data: colorData, isLoading: isColorLoading } = useGetSewingColorQuery(
    { style: style?.nStyleID, po: po?.cOrderNu, country: country?.nConCode }
  );
  //get line
  const { data: lineData, isLoading: isLineLoading } = useGetSewingLineQuery({
    style: style?.nStyleID,
    po: po?.cOrderNu,
    country: country?.nConCode,
    color: color?.nColNo,
  });
  //get size
  const { data: sizeData, isLoading: isSizeLoading } = useGetSewingSizeQuery({
    style: style?.nStyleID,
    po: po?.cOrderNu,
    country: country?.nConCode,
    color: color?.nColNo,
    line: line?.line_Code,
  });
  //get hourly production
  const {
    data: hourlyProdData,
    isSuccess: isHourlyProdSuccess,
    refetch: refetchHourlyProd,
  } = useGetSewingHourlyProdQuery(
    {
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
      country: country?.nConCode,
      color: color?.nColNo,
      line: line?.line_Code,
      size: size?.size_Id,
      hour: hour,
      date: date,
    },
    { refetchOnMountOrArgChange: true }
  );
  //save sewing production
  const [
    saveSewingProduction,
    { data: saveData, isLoading: isSaveLoading, isSuccess: isSaveSuccess },
  ] = useSaveSewingProductionMutation();

  //get buyer data
  const { data: buyerData, isLoading: isBuyerLoading } = useGetFabricBuyerQuery(
    user?.companyID
  );
  //get buyer data
  const { data: modalStyleData, isLoading: isModalStyleLoading } =
    useGetSewingShipOutQuery(buyer?.nBuyer_ID);
  //get report data
  const {
    data: reportData,
    isLoading: isReportLoading,
    refetch: refetchReport,
  } = useGetSewingReportDailyLineStageWiseQuery({
    id: user?.companyID,
    styleId: style?.nStyleID,
    style: style?.cStyleNo,
    lineId: line?.line_Code,
    line: line?.line_No,
    date: date,
    user: user?.userName,
  });

  //active shipt out
  const [
    activeSewingProduction,
    { data: activeData, isSuccess: activeSuccess },
  ] = useActiveSewingProductionMutation();
  //inActive shipt out
  const [
    inActiveSewingProduction,
    { data: inActiveData, isSuccess: inActiveSuccess },
  ] = useInActiveSewingProductionMutation();

  //handleShipOut function
  const handleShipOut = () => {
    const payload = {
      styleID: modalStyle?.nOStyleId,
      userName: user?.userName,
    };
    activeSewingProduction(payload);
  };
  //handleNotShipOut function
  const handleNotShipOut = () => {
    const payload = {
      styleID: modalStyle?.nOStyleId,
      userName: user?.userName,
    };
    inActiveSewingProduction(payload);
  };
  console.log(hourlyProdData);
  //handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputQty =
      hourlyProdData && hourlyProdData[0]?.tHrPQty + parseInt(sewingQty);

    const payload = {
      comID: user?.companyID,
      styleID: style?.nStyleID,
      style: style?.cStyleNo,
      po: po?.cPoNum,
      country: country?.cConDes,
      countryID: country?.nConCode,
      lot: po?.cOrderNu,
      colorID: color?.nColNo,
      color: color?.cColour,
      lineID: line?.line_Code,
      line: line?.line_No,
      hour: parseInt(hour),
      inputdate: date,
      sizeID: size?.size_Id,
      size: size?.size,
      // inputqty: inputQty,
      inputqty: parseInt(sewingQty),
      hourProQty: inputQty,
      userName: user?.userName,
    };
    console.log(payload);
    saveSewingProduction(payload);
    setSize(null);
  };

  //handleReport function
  const handleReport = () => {
    if (reportData) {
      setReportDataView(null);
      refetchReport();
      // setModalOpen(false);
      setModalOpen(true);
    } else {
      refetchReport();
      // setModalOpen(true);
    }
  };

  useEffect(() => {
    if (reportData) {
      // setModalOpen(true);
      setReportDataView(reportData);
    }
  }, [reportData]);

  //state management
  useEffect(() => {
    if (!style) {
      setPo(null);
      setCountry(null);
      setColor(null);
      setLine(null);
      setSize(null);
    }
    if (!po) {
      setCountry(null);
      setColor(null);
      setLine(null);
      setSize(null);
    }
    if (!country) {
      setColor(null);
      setLine(null);
      setSize(null);
    }
    if (!color) {
      setLine(null);
      setSize(null);
    }
    if (!line) {
      setSize(null);
    }
  }, [style, po, country, color, line]);

  //validation and toast
  useEffect(() => {
    if (hourlyProdData?.length > 0) {
      if (sewingQty > hourlyProdData[0]?.inputQty - hourlyProdData[0]?.sewQty) {
        warningToast("Sewing Quantity Cannot Exceed Balance Qty.");
        setSewingQty(0);
      }
    }
  }, [sewingQty]);
  //toast message
  useEffect(() => {
    if (isSaveSuccess) {
      successToast(saveData.message);
      setSize(null);
      setHourlyProd(null);
      setSewingQty("");
      // refetchHourlyProd();
    }
  }, [isSaveSuccess]);
  useEffect(() => {
    inActiveSuccess && successToast(inActiveData.message);
    activeSuccess && successToast(activeData.message);
  }, [inActiveSuccess, activeSuccess]);
  useEffect(() => {
    isHourlyProdSuccess && setHourlyProd(hourlyProdData);
  }, [isHourlyProdSuccess, hourlyProdData]);
  useEffect(() => {
    setSewingQty("");
  }, [size]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CustomAppBar title={"INPUT SEWING PRODUCTION DATA"} />
        <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
          <Grid container spacing={1} mt={"5px"}>
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Style"}
                options={styleData ?? []}
                value={style}
                optionLabel={"cStyleNo"}
                optionId={"nStyleID"}
                loading={isStyleLoading}
                setSelectedValue={setStyle}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"PO No"}
                options={poData ?? []}
                value={po}
                optionLabel={"cPoNum"}
                optionId={"cPoNum"}
                loading={isPoLoading}
                setSelectedValue={setPo}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Country"}
                options={countryData ?? []}
                value={country}
                optionLabel={"cConDes"}
                optionId={"nConCode"}
                loading={isCountryLoading}
                setSelectedValue={setCountry}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Color"}
                options={colorData ?? []}
                value={color}
                optionLabel={"cColour"}
                optionId={"nColNo"}
                loading={isColorLoading}
                setSelectedValue={setColor}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Line"}
                options={lineData ?? []}
                value={line}
                optionLabel={"line_No"}
                optionId={"line_Code"}
                loading={isLineLoading}
                setSelectedValue={setLine}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextInput
                label={"Hour"}
                // name="buyer"
                type="number"
                value={hour}
                setStateValue={setHour}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomDatePicker
                label={"Date"}
                name="bookingDate"
                prevDate={1}
                disableFuture={true}
                required={true}
                setData={setDate}
                value={date}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 1 }}></Box>
        <CustomAppBar title={"SIZE INFO"} />
        <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
          <Grid container spacing={1} mt={"5px"}>
            <Grid item xs={12} sm={4} md={2}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Size"}
                options={sizeData ?? []}
                value={size}
                optionLabel={"size"}
                optionId={"size_Id"}
                loading={isSizeLoading}
                setSelectedValue={setSize}
                required={true}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={2}>
              <CustomTextInput
                label={"Sewing Qty"}
                isNumber={true}
                maxLength={4}
                value={sewingQty}
                setStateValue={setSewingQty}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <CustomTextInput
                label={"Total Order Qty"}
                value={size && hourlyProd ? hourlyProdData[0]?.ordQty : ""}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <CustomTextInput
                label={"Total Input Qty"}
                value={size && hourlyProd ? hourlyProdData[0]?.inputQty : ""}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <CustomTextInput
                label={"Total Production Qty"}
                value={size && hourlyProd ? hourlyProdData[0]?.sewQty : ""}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <CustomTextInput
                label={"Total Balance Qty"}
                // value="12"
                value={
                  size && hourlyProd
                    ? isNaN(
                        hourlyProdData[0]?.inputQty - hourlyProdData[0]?.sewQty
                      )
                      ? ""
                      : hourlyProdData[0]?.inputQty - hourlyProdData[0]?.sewQty
                    : ""
                }
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ my: 1, mb: 1, border: "1px dashed grey", mr: "1px" }}>
          <Stack
            direction={"row"}
            p={0.5}
            spacing={2}
            justifyContent="space-between"
          >
            <span></span>

            <span style={{ margin: "0px" }}>
              <LoadingButton
                style={{ margin: "2px" }}
                sx={{ minWidth: "160px" }}
                // type={type}
                variant="contained"
                size="small"
                color="success"
                onClick={() => setShowModal(true)}
                // loading={loading}
                // disabled={disabled}
                loadingIndicator="Loading..."
              >
                <BsBarChartSteps
                  style={{
                    marginRight: "5px",
                    fontSize: "18px",
                    color: "white",
                  }}
                />
                style ship out
              </LoadingButton>

              <ReportButton
                title={"report"}
                handleClick={handleReport}
                loading={isReportLoading}
                // disabled={reportData}
              />

              <SubmitButton
                title={"save"}
                type="submit"
                // handleClick={}
                loading={isSaveLoading}
                disabled={
                  hourlyProdData &&
                  sewingQty >
                    hourlyProdData[0]?.inputQty - hourlyProdData[0]?.sewQty
                }
              />
            </span>
          </Stack>
        </Box>
      </form>
      <ReportViewer
        title={"Daily Line Wise Sewing Report"}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        reportData={reportDataView}
      />

      <div>
        <ReportModal
          maxWidth="600px"
          open={showModal}
          setOpen={setShowModal}
          title={"Style Ship Out"}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Buyer"}
                options={buyerData ?? []}
                value={buyer}
                optionLabel={"cBuyer_Name"}
                optionId={"nBuyer_ID"}
                loading={isBuyerLoading}
                setSelectedValue={setBuyer}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Style No"}
                options={modalStyleData ?? []}
                value={modalStyle}
                optionLabel={"cStyleNo"}
                optionId={"nOStyleId"}
                loading={isModalStyleLoading}
                setSelectedValue={setModalStyle}
                required={true}
              />
            </Grid>
          </Grid>
          <Box sx={{ my: 1, mb: 1, border: "1px dashed grey", mr: "1px" }}>
            <Stack
              direction={"row"}
              p={0.5}
              spacing={2}
              justifyContent="space-between"
            >
              <span></span>

              <span>
                <ReturnButton
                  title={"Not shift out"}
                  type="button"
                  handleClick={handleNotShipOut}
                />

                <SubmitButton
                  title={"shift out"}
                  type="button"
                  handleClick={handleShipOut}
                  // loading={isSaveLoading}
                  //   disabled={selectedRow.length <= 0 || showApproval}
                />
              </span>
            </Stack>
          </Box>
        </ReportModal>
      </div>
    </>
  );
};

export default SewingProductionInput;

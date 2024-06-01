import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import {
  useGetLayRatioAutoLayQuery,
  useGetLayRatioCountryQuery,
  useGetLayRatioCutNoQuery,
  useGetLayRatioPoQuery,
  useGetLayRatioStyleQuery,
  useGetLayRatioYearQuery,
} from "../../../redux/features/cutting/cuttingLayRatio/queryCuttngLayRatio";
import { useDispatch, useSelector } from "react-redux";
import { successToast } from "../../../common/toaster/toaster";

import {
  useSaveLayCuttingMutation,
  useSaveLayRatioMutation,
} from "../../../redux/features/cutting/cuttingLayRatio/mutationCuttingLayRatio";

import {
  resetState,
  setCuttingLayRatio,
} from "../../../redux/features/cutting/cuttingLayRatio/cuttingLayRatioSlice";
import CuttingLayRatioButton from "./CuttingLayRatioButton";
import CuttingLaySizeRatioView from "./CuttingLaySizeRatioView";
import dayjs from "dayjs";

const CuttingLayRationInput = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    year,
    style,
    date,
    po,
    country,
    cutNo,
    autoLay,
    manualLay,
    bundleQty,
    remarks,
  } = useSelector((state) => state.cuttingLayRatio);

  const [finalRatio, setFinalRatio] = useState([]);
  const [finalDetails, setFinalDetails] = useState([]);

  // year
  const { data: yearData, isLoading: isYearLoading } = useGetLayRatioYearQuery(
    user?.companyID
  );
  // style
  const { data: styleData, isLoading: isStyleLoading } =
    useGetLayRatioStyleQuery({ comId: user?.companyID, year: year?.nYear });

  console.log(styleData)
  //PO No
  const { data: poData, isLoading: isPoLoading } = useGetLayRatioPoQuery(
    style?.nStyleID
  );
  //Country
  const { data: countryData, isLoading: isCountryLoading } =
    useGetLayRatioCountryQuery({ style: style?.nStyleID, poId: po?.cOrderNu });
  //cut
  const {
    data: cutNoData,
    refetch: cutNoRefetch,
    isSuccess,
  } = useGetLayRatioCutNoQuery(
    {
      style: style?.nStyleID,
      poId: po?.cOrderNu,
    },
    { refetchOnMountOrArgChange: true }
  );
  //Auto Lay
  const { data: autoLayData, refetch: autoLayRefetch } =
    useGetLayRatioAutoLayQuery({
      style: style?.nStyleID,
      poId: po?.cOrderNu,
    });

  const [saveLayCutting, { data: saveLayData, isSuccess: isSaveLaySuccess }] =
    useSaveLayCuttingMutation();
  const [saveLayRatio, { isSuccess: isSaveRatioSuccess }] =
    useSaveLayRatioMutation();

  // handle save button
  const handleSave = (e) => {
    e.preventDefault();
    // payload for save LayCutting
    const payload = finalDetails.map((e) => {
      return {
        cutNo: cutNoData[0]?.nCutNum,
        cyear: year?.nYear,
        lay: autoLayData[0]?.column1 + 1,
        // crow: 0,
        fabriccolor:
          e?.detailsColor === "" || e?.detailsPlies === undefined
            ? null
            : parseInt(e?.detailsColor),
        fabricshade: e?.detailsShade === undefined ? 0 : e?.detailsShade,
        lot: e?.detailsLot === undefined ? 0 : e?.detailsLot,
        plies:
          e?.detailsPlies === "" || e?.detailsPlies === undefined
            ? null
            : parseInt(e?.detailsPlies),
        qty: bundleQty === "" ? null : parseInt(bundleQty),
        reallay: manualLay === "" ? null : parseInt(manualLay),
        userName: user?.userName,
        styleID: style?.nStyleID,
        pono: po?.cOrderNu,
        companyID: user?.companyID,
        countryID: country?.nConCode,
        productiondate: date,
        remarks: remarks,
      };
    });
    const filterPayLoad = payload.filter(
      (e) => e.fabriccolor !== null && e.plies !== null && e.plies !== 0
    );
    saveLayCutting(filterPayLoad);
    // payload for save Lay Ratio
    const ratioPayload = finalRatio.map((e) => {
      return {
        cutNo: cutNoData[0]?.nCutNum,
        cyear: year?.nYear,
        lay: autoLayData[0]?.column1 + 1,
        crow: parseInt(e?.sizeNo),
        reallay: manualLay === "" ? null : parseInt(manualLay),
        productiondate: date,
        userName: user?.userName,
        styleID: style?.nStyleID,
        lot: po?.cOrderNu,
        countryID: country?.nConCode,
        size: e?.orgSize,
        ratio: e?.ratioValue === undefined ? null : parseInt(e?.ratioValue),
        pono: po?.cPoNum,
      };
    });
    const filterRatioPayLoad = ratioPayload.filter(
      (e) => e.ratio !== null && e.ratio !== 0
    );
    saveLayRatio(filterRatioPayLoad);
  };
  useEffect(() => {
    // set default date
    dispatch(
      setCuttingLayRatio({
        key: "date",
        value: dayjs(new Date()).format("DD-MMM-YYYY"),
      })
    );
  }, []);

  useEffect(() => {
    if (cutNoData && po)
      dispatch(
        setCuttingLayRatio({ key: "cutNo", value: cutNoData[0]?.nCutNum })
      );
    if (autoLayData && po) {
      dispatch(
        setCuttingLayRatio({
          key: "autoLay",
          value: autoLayData[0]?.column1 + 1,
        })
      );
      dispatch(
        setCuttingLayRatio({
          key: "manualLay",
          value: autoLayData[0]?.column1 + 1,
        })
      );
    }
  }, [isSuccess, autoLayData]);
  useEffect(() => {
    if (isSaveLaySuccess && isSaveRatioSuccess)
      successToast(saveLayData?.message);
    if (isSaveRatioSuccess) {
      dispatch(resetState());
      setFinalDetails([]);
      setFinalRatio([]);
    }
  }, [isSaveLaySuccess, isSaveRatioSuccess]);

  useEffect(() => {
    if (po) {
      cutNoRefetch();
      autoLayRefetch();
    }
    if (!po || po === null) {
      dispatch(setCuttingLayRatio({ key: "cutNo", value: "" }));
      dispatch(setCuttingLayRatio({ key: "autoLay", value: "" }));
      setFinalRatio([]);
      setFinalDetails([]);
    }
  }, [po]);

  return (
    <>
      <form onSubmit={handleSave}>
        <CustomAppBar title={"Cutting Ratio, Plies Data"} />
        <Box
          sx={{
            p: 1,
            border: "1px dashed grey",
            borderTop: "none",
            // mr: "1px",
          }}
        >
          <Grid container spacing={1} mt={"5px"}>
            <Grid item xs={12} sm={6} md={4}>
              <CustomAutocomplete
                label={"Year"}
                name="year"
                options={yearData ?? []}
                value={year}
                optionLabel={"nYear"}
                optionId={"nYear"}
                loading={isYearLoading}
                setReduxState={setCuttingLayRatio}
                required={true}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CustomAutocomplete
                label={"Style"}
                name="style"
                options={year ? styleData ?? [] : []}
                value={style}
                optionLabel={"cStyleNo"}
                optionId={"nStyleID"}
                loading={isStyleLoading}
                setReduxState={setCuttingLayRatio}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomDatePicker
                label={"Date"}
                name={"date"}
                prevDate={2}
                futureDate={2}
                value={date}
                setReduxState={setCuttingLayRatio}
                required={true}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CustomAutocomplete
                label={"PO No"}
                name="po"
                options={style ? poData ?? [] : []}
                value={po}
                optionLabel={"cPoNum"}
                optionId={"cPoNum"}
                loading={isPoLoading}
                setReduxState={setCuttingLayRatio}
                required={true}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CustomAutocomplete
                label={"Country"}
                name="country"
                options={po ? countryData ?? [] : []}
                value={country}
                optionLabel={"cConDes"}
                optionId={"nConCode"}
                loading={isCountryLoading}
                setReduxState={setCuttingLayRatio}
                required={true}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CustomTextInput label={"Cut No"} value={cutNo} disabled={true} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextInput
                label={"Auto Lay"}
                type="number"
                value={autoLay}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextInput
                label={"Manual Lay"}
                name="manualLay"
                isNumber={true}
                maxLength={3}
                value={manualLay}
                setReduxState={setCuttingLayRatio}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextInput
                label={"Bundle Qty"}
                name="bundleQty"
                isNumber={true}
                maxLength={3}
                value={bundleQty}
                setReduxState={setCuttingLayRatio}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <CustomTextInput
                label={"Remarks"}
                name="remarks"
                value={remarks}
                setReduxState={setCuttingLayRatio}
                multiline
              />
            </Grid>
          </Grid>
        </Box>
        <CuttingLaySizeRatioView
          finalDetails={finalDetails}
          setFinalDetails={setFinalDetails}
          finalRatio={finalRatio}
          setFinalRatio={setFinalRatio}
        />

        <CuttingLayRatioButton />
      </form>
    </>
  );
};

export default CuttingLayRationInput;

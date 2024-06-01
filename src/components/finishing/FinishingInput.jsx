import React, { useEffect, useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { Box, Grid, Stack } from "@mui/material";
import CustomAppBar from "../common/CustomAppBar";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomDatePicker from "../inputs/CustomDatePicker";
import CustomTextInput from "../inputs/CustomTextInput";
import { useSelector } from "react-redux";
import {
  useGetFinishingColorQuery,
  useGetFinishingCountryQuery,
  useGetFinishingFloorQuery,
  useGetFinishingHourlyProductionQuery,
  useGetFinishingLineQuery,
  useGetFinishingPoQuery,
  useGetFinishingSizeQuery,
  useGetFinishingStyleQuery,
} from "../../redux/features/finishing/finishing/queryFinishing";
import { successToast, warningToast } from "../../common/toaster/toaster";
import { useSaveFinishingProductionMutation } from "../../redux/features/finishing/finishing/mutationFinishing";

const FinishingInput = () => {
  const { user } = useSelector((state) => state.auth);
  const [style, setStyle] = useState(null);
  const [po, setPo] = useState(null);
  const [country, setCountry] = useState(null);
  const [color, setColor] = useState(null);
  const [floor, setFloor] = useState(null);
  const [line, setLine] = useState(null);
  const [date, setDate] = useState(null);
  const [size, setSize] = useState(null);
  const [finishingQty, setFinishingQty] = useState("");
  const [hourlyProd, setHourlyProd] = useState(null);

  //get style data
  const { data: styleData, isLoading: isStyleLoading } =
    useGetFinishingStyleQuery(user?.companyID);
  //get PO data
  const { data: poData, isLoading: isPoLoading } = useGetFinishingPoQuery(
    style?.nStyleID
  );

  //get Country data
  const { data: countryData, isLoading: isCountryLoading } =
    useGetFinishingCountryQuery({
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
    });

  //get Color data
  const { data: colorData, isLoading: isColorLoading } =
    useGetFinishingColorQuery({
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
      country: country?.nConCode,
    });
  //get Floor data
  const { data: floorData, isLoading: isFloorLoading } =
    useGetFinishingFloorQuery({
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
      country: country?.nConCode,
      color: color?.nColNo,
    });
  // get Line data
  const { data: lineData, isLoading: isLineLoading } = useGetFinishingLineQuery(
    {
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
      country: country?.nConCode,
      color: color?.nColNo,
      floor: floor?.floorID,
    }
  );

  //get Color data
  const { data: sizeData, isLoading: isSizeLoading } = useGetFinishingSizeQuery(
    {
      // id, style, po, country, color
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
      country: country?.nConCode,
      color: color?.nColNo,
    }
  );

  //get hourly production
  const {
    data: hourlyProdData,
    isSuccess: isHourlyProdSuccess,
    refetch: refetchHourlyProd,
  } = useGetFinishingHourlyProductionQuery(
    {
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
      country: country?.nConCode,
      color: color?.nColNo,
      line: line?.line_Code,
      size: size?.size_Id,
    },
    { refetchOnMountOrArgChange: true }
  );

  //save sewing production
  const [
    saveFinishingProduction,
    { data: saveData, isLoading: isSaveLoading, isSuccess: isSaveSuccess },
  ] = useSaveFinishingProductionMutation();

  //validation and toast
  useEffect(() => {
    if (hourlyProdData?.length > 0) {
      if (
        finishingQty >
        hourlyProdData[0]?.sewQty - hourlyProdData[0]?.finisQty
      ) {
        warningToast("Finishing Quantity Cannot Exceed Balance Qty.");
        setFinishingQty(0);
      }
    }
  }, [finishingQty]);

  useEffect(() => {
    isHourlyProdSuccess && setHourlyProd(hourlyProdData);
  }, [isHourlyProdSuccess]);

  //handleSave function
  const handleSave = (e) => {
    e.preventDefault();
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
      line: line?.line_No,
      lineID: line?.line_Code,
      // hour: parseInt(hour),
      inputdate: date,
      sizeID: size?.size_Id,
      size: size?.size,
      // inputqty: inputQty,
      inputqty: parseInt(finishingQty),
      userName: user?.userName,
    };
    saveFinishingProduction(payload);
    setSize(null);
  };

  //toast message
  useEffect(() => {
    if (isSaveSuccess) {
      successToast(saveData.message);
      setSize(null);
      setHourlyProd(null);
      setFinishingQty("");
      // refetchHourlyProd();
    }
  }, [isSaveSuccess]);

  useEffect(() => {
    setFinishingQty("");
  }, [size]);
  console.log(size);
  return (
    <>
      <form onSubmit={handleSave}>
        <CustomAppBar title={"INPUT FINISHING DATA"} />
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
                options={style ? poData ?? [] : []}
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
                options={po ? countryData ?? [] : []}
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
                options={country ? colorData ?? [] : []}
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
                label={"Floor"}
                options={color ? floorData ?? [] : []}
                value={floor}
                optionLabel={"floorName"}
                optionId={"floorID"}
                loading={isFloorLoading}
                setSelectedValue={setFloor}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Line"}
                options={floor ? lineData ?? [] : []}
                value={line}
                optionLabel={"line_No"}
                optionId={"line_Code"}
                loading={isLineLoading}
                setSelectedValue={setLine}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomDatePicker
                label={"Date"}
                name={"date"}
                disableFuture={true}
                prevDate={2}
                futureDate={1}
                value={date}
                setData={setDate}
                required={true}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={3}>
              <CustomAutocomplete
                // setValue={setValue}
                label={"Cut Number"}
                // options={cutNoData ?? []}
                // value={cutNo}
                optionLabel={"cLayNo"}
                optionId={"cLayNo"}
                // loading={isCutNoLoading}
                // setSelectedValue={setCutNo}
                required={true}
              />
            </Grid> */}
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
                options={color ? sizeData ?? [] : []}
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
                label={"Finishing Qty"}
                isNumber={true}
                maxLength={6}
                value={finishingQty}
                setStateValue={setFinishingQty}
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
                label={"Total Sewing Qty"}
                value={size && hourlyProd ? hourlyProdData[0]?.sewQty : ""}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <CustomTextInput
                label={"Total Finishing Qty"}
                value={
                  size && hourlyProd ? hourlyProdData[0]?.finisQty ?? 0 : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <CustomTextInput
                label={"Total Balance Qty"}
                // value="12"
                value={
                  size && hourlyProd
                    ? hourlyProdData[0]?.sewQty - hourlyProdData[0]?.finisQty
                    : ""
                }

                // setStateValue={setHourlyProd(hourlyProdData)}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 1, mb: 0, border: "1px dashed grey" }}>
          <Stack
            direction={"row"}
            p={0.5}
            spacing={2}
            justifyContent="space-between"
          >
            <span></span>

            <span>
              <SubmitButton
                title={"Save"}
                type="submit"
                loading={isSaveLoading}
                // handleClick={}
                disabled={
                  hourlyProdData &&
                  finishingQty >
                    hourlyProdData[0]?.sewQty - hourlyProdData[0]?.finisQty
                }
              />
            </span>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default FinishingInput;

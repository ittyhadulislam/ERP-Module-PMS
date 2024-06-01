import React, { useEffect, useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { Box, Grid, Stack } from "@mui/material";
import CustomAppBar from "../common/CustomAppBar";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomDatePicker from "../inputs/CustomDatePicker";
import CustomTextInput from "../inputs/CustomTextInput";
import { useSelector } from "react-redux";
import {
  useGetPackingColorQuery,
  useGetPackingCountryQuery,
  useGetPackingFloorQuery,
  useGetPackingHourlyProductionQuery,
  useGetPackingLineQuery,
  useGetPackingPoQuery,
  useGetPackingSizeQuery,
  useGetPackingStyleQuery,
} from "../../redux/features/finishing/packing/queryPacking";
import { successToast, warningToast } from "../../common/toaster/toaster";
import { useSavePackingProductionMutation } from "../../redux/features/finishing/packing/mutationPacking";

const PackingInput = () => {
  const { user } = useSelector((state) => state.auth);
  const [style, setStyle] = useState(null);
  const [po, setPo] = useState(null);
  const [country, setCountry] = useState(null);
  const [color, setColor] = useState(null);
  const [floor, setFloor] = useState(null);
  const [line, setLine] = useState(null);
  const [date, setDate] = useState(null);
  const [size, setSize] = useState(null);
  const [packingQty, setPackingQty] = useState("");
  const [hourlyProd, setHourlyProd] = useState(null);

  //get style data
  const { data: styleData, isLoading: isStyleLoading } =
    useGetPackingStyleQuery(user?.companyID);
  //get PO data
  const { data: poData, isLoading: isPoLoading } = useGetPackingPoQuery(
    style?.nStyleID
  );

  //get Country data
  const { data: countryData, isLoading: isCountryLoading } =
    useGetPackingCountryQuery({
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
    });

  //get Color data
  const { data: colorData, isLoading: isColorLoading } =
    useGetPackingColorQuery({
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
      country: country?.nConCode,
    });
  //get Floor data
  const { data: floorData, isLoading: isFloorLoading } =
    useGetPackingFloorQuery({
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
      country: country?.nConCode,
      color: color?.nColNo,
    });
  // get Line data
  const { data: lineData, isLoading: isLineLoading } = useGetPackingLineQuery({
    id: user?.companyID,
    style: style?.nStyleID,
    po: po?.cOrderNu,
    country: country?.nConCode,
    color: color?.nColNo,
    floor: floor?.floorID,
  });

  //get size data
  const { data: sizeData, isLoading: isSizeLoading } = useGetPackingSizeQuery({
    // id, style, po, country, color
    id: user?.companyID,
    style: style?.nStyleID,
    po: po?.cOrderNu,
    country: country?.nConCode,
    color: color?.nColNo,
  });

  //get hourly production
  const {
    data: hourlyProdData,
    isSuccess: isHourlyProdSuccess,
    refetch: refetchHourlyProd,
  } = useGetPackingHourlyProductionQuery(
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
    savePackingProduction,
    { data: saveData, isLoading: isSaveLoading, isSuccess: isSaveSuccess },
  ] = useSavePackingProductionMutation();

  //validation and toast
  useEffect(() => {
    if (hourlyProdData?.length > 0) {
      if (
        packingQty >
        hourlyProdData[0]?.finisQty - hourlyProdData[0]?.packQty
      ) {
        warningToast("Packing Quantity Cannot Exceed Balance Qty.");
        setPackingQty(0);
      }
    }
  }, [packingQty]);

  useEffect(() => {
    isHourlyProdSuccess && setHourlyProd(hourlyProdData);
  }, [isHourlyProdSuccess]);
  //handleSave function
  const handleSave = (e) => {
    e.preventDefault();
    // comID: user?.companyID,

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
      inputdate: date,
      sizeID: size?.size_Id,
      size: size?.size,
      inputqty: packingQty,
      userName: user?.userName,
    };

    savePackingProduction(payload);

    setSize(null);
  };

  //toast message
  useEffect(() => {
    if (isSaveSuccess) {
      successToast(saveData.message);
      setSize(null);
      setHourlyProd(null);
      setPackingQty("");
      // refetchHourlyProd();
    }
  }, [isSaveSuccess]);
  useEffect(() => {
    setPackingQty("");
  }, [size]);
  return (
    <>
      <form onSubmit={handleSave}>
        <CustomAppBar title={"INPUT PACKING DATA"} />
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
                label={"Packing  Qty"}
                isNumber={true}
                maxLength={6}
                value={packingQty}
                setStateValue={setPackingQty}
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
                label={"Total Finishing Qty"}
                value={size && hourlyProd ? hourlyProdData[0]?.finisQty : ""}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <CustomTextInput
                label={"Total Packing Qty"}
                value={
                  size && hourlyProd ? hourlyProdData[0]?.packQty ?? 0 : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <CustomTextInput
                label={"Total Balance Qty"}
                // value="12"
                value={
                  size && hourlyProd
                    ? hourlyProdData[0]?.finisQty - hourlyProdData[0]?.packQty
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
                // handleClick={}
                loading={isSaveLoading}
                disabled={
                  hourlyProdData &&
                  packingQty >
                    hourlyProdData[0]?.finisQty - hourlyProdData[0]?.packQty
                }
              />
            </span>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default PackingInput;

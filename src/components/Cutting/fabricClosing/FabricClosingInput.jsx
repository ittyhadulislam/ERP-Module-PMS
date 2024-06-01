import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import SubmitButton from "../../buttons/SubmitButton";
import CustomTable from "../../table/CustomTable";
import { successToast, warningToast } from "../../../common/toaster/toaster";
import { useSelector } from "react-redux";
import { useGetInputStyleQuery } from "../../../redux/features/cutting/inputCutPanel/queryInputCutPanel";
import {
  useGetCutQtyQuery,
  useGetFabricBuyerQuery,
  useGetFabricColorQuery,
  useGetFabricQuery,
  useGetFabricStyleQuery,
  useGetOrderQtyQuery,
} from "../../../redux/features/cutting/fabric/queryFabric";
import { useSaveFabricMutation } from "../../../redux/features/cutting/fabric/mutationFabric";

const FabricClosingInput = () => {
  const { user } = useSelector((state) => state.auth);

  const [buyer, setBuyer] = useState(null);
  const [style, setStyle] = useState(null);
  const [color, setColor] = useState(null);
  const [fabric, setFabric] = useState(null);

  const [consumption, setConsumption] = useState("");
  const [receivedQty, setReceivedQty] = useState("");
  const [returnQty, setReturnQty] = useState("");
  const [remarks, setRemarks] = useState("");

  //get buyer data
  const { data: buyerData, isLoading: isBuyerLoading } = useGetFabricBuyerQuery(
    user?.companyID
  );
  //get style data
  const { data: styleData, isLoading: isStyleLoading } = useGetFabricStyleQuery(
    { id: user?.companyID, buyer: buyer?.nBuyer_ID }
  );
  //get color data
  const { data: colorData, isLoading: isColorLoading } = useGetFabricColorQuery(
    { id: user?.companyID, style: style?.nStyleID }
  );
  //get fabric data
  const { data: fabricData, isLoading: isFabricLoading } = useGetFabricQuery();
  //get order data
  const { data: orderData } = useGetOrderQtyQuery({
    style: style?.nStyleID,
    color: color?.nColNo,
  });
  //get cut data
  const { data: cutData } = useGetCutQtyQuery({
    style: style?.nStyleID,
    color: color?.nColNo,
  });

  //save fabric
  const [saveFabric, { data: saveData, isSuccess: isSaveSuccess }] =
    useSaveFabricMutation();

  //calculation
  const requiredCal = (orderData && orderData[0]?.orgQty * consumption) || 0;

  const handleAdd = (e) => {
    e.preventDefault();
    const payload = {
      comID: user?.companyID,
      buyer: parseInt(buyer?.nBuyer_ID),
      style: parseInt(style?.nStyleID),
      color: parseInt(color?.nColNo),
      orderqty: orderData && orderData[0]?.orgQty,
      cutqty: cutData && cutData[0]?.cutQty,
      fabricName: parseInt(fabric?.fn_id),
      consumtion: parseFloat(consumption),
      rqrdqty: requiredCal,
      rcvdqty: parseInt(receivedQty),
      rtnqty: parseInt(returnQty),
      remarks: remarks,
      createdby: user?.userName,
    };
    saveFabric(payload);
  };

  useEffect(() => {
    if (isSaveSuccess) {
      successToast(saveData?.message);
      // setBuyer(null);
      // setStyle(null);
      setColor(null);
      setFabric(null);
      setConsumption("");
      setReceivedQty("");
      setReturnQty("");
      setRemarks("");
    }
  }, [isSaveSuccess]);

  return (
    <form onSubmit={handleAdd}>
      <CustomAppBar title={"Edit Fabric Consumption"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={3}>
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
              label={"Fabric Name"}
              options={fabricData ?? []}
              value={fabric}
              optionLabel={"fn_desc"}
              optionId={"fn_id"}
              loading={isFabricLoading}
              setSelectedValue={setFabric}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Order Qty (Pcs)"}
              // isNumber={true}
              // maxLength={2}
              //   type="number"
              value={color ? orderData && orderData[0]?.orgQty : ""}
              required={true}
              //   value={garmentsData && garmentsData[0]?.nTotOrdQty}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Cut Qty (Pcs)"}
              value={color ? cutData && cutData[0]?.cutQty : ""}
              required={true}
              //   value={garmentsData && garmentsData[0]?.nTotOrdQty}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Consumption (Pcs)"}
              maxLength={3}
              type="number"
              // isNumber={true}
              value={consumption}
              setStateValue={setConsumption}
              required={true}
              //   value={garmentsData && garmentsData[0]?.nTotOrdQty}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Required Qty(Yds)"}
              // maxLength={6}
              // isNumber={true}
              value={requiredCal}
              // setStateValue={setRequiredQty}
              required={true}
              //   value={garmentsData && garmentsData[0]?.nTotOrdQty}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Received Qty (Yds)"}
              maxLength={6}
              isNumber={true}
              value={receivedQty}
              setStateValue={setReceivedQty}
              required={true}
              //   value={garmentsData && garmentsData[0]?.nTotOrdQty}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Return Qty (Yds)"}
              maxLength={6}
              isNumber={true}
              value={returnQty}
              setStateValue={setReturnQty}
              required={true}
              //   value={garmentsData && garmentsData[0]?.nTotOrdQty}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomTextInput
              label={"Remarks"}
              value={remarks}
              setStateValue={setRemarks}
              //   value={garmentsData && garmentsData[0]?.nTotOrdQty}
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
              title={"Add"}
              type="submit"
              // handleClick={handleAdd}
              loading={isStyleLoading}
              disabled={isStyleLoading}
            />
          </span>
        </Stack>
      </Box>
    </form>
  );
};

export default FabricClosingInput;

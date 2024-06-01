import React, { useEffect } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import FieldSet from "../../common/FieldSet";
import {
  useGetOrderTypeQuery,
  useGetWeavingBuyerQuery,
  useGetWeavingColorQuery,
  useGetWeavingCompositionQuery,
  useGetWeavingConstructionQuery,
  useGetWeavingCustomerQuery,
  useGetWeavingDesignQuery,
  useGetWeavingDiaQuery,
  useGetWeavingFabricTypeQuery,
  useGetWeavingGsmQuery,
  useGetWeavingUnitQuery,
} from "../../../redux/features/weaving/orderReceive/queryOrderReceive";
// import { setEditOrderReceive } from "../../../redux/features/weaving/orderReceive/orderReceiveSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetCostingOrderInfoQuery } from "../../../redux/features/weaving/costing/queryCosting";
import { setEditOrderReceive } from "../../../redux/features/weaving/orderReceive/editOrderReceiveSlice";

const EditOrderReceivingInput = ({ isDisabled = false, deleteData }) => {
  const dispatch = useDispatch();
  const {
    orderNumber,
    orderType,
    customer,
    buyer,
    color,
    fabricComposition,
    fabricConstruction,
    fabricColor,
    gsm,
    design,
    dia,
    unit,
    //-text input
    // orderNo,
    gmtName,
    gmtQty,
    fabricConsumption,
    fabricQty,
    orderReceiveDate,
    deliveryDate,
    remarks,
  } = useSelector((state) => state.editOrderReceive);

  // get order number
  const { data, isLoading, refetch } = useGetCostingOrderInfoQuery();

  useEffect(() => {
    if (deleteData) refetch();
  }, [deleteData]);

  // get order type
  const { data: orderTypeData, isLoading: orderTypeLoading } =
    useGetOrderTypeQuery(undefined, { refetchOnMountOrArgChange: true });
  //get customer data
  const { data: customerData, isLoading: customerDataLoading } =
    useGetWeavingCustomerQuery(undefined, { refetchOnMountOrArgChange: true });
  //get buyer data
  const { data: buyerData, isLoading: buyerLoading } = useGetWeavingBuyerQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  // get color data
  const { data: colorData, isLoading: colorLoading } = useGetWeavingColorQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  // get fabric type data
  const { data: fabricTypeData, isLoading: fabricTypeLoading } =
    useGetWeavingFabricTypeQuery();
  //get composition data
  const { data: compositionData, isLoading: compositionLoading } =
    useGetWeavingCompositionQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  //get contraction data
  const { data: constructionData, isLoading: constructionLoading } =
    useGetWeavingConstructionQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  // get dia data
  const { data: diaData, isLoading: diaLoading } = useGetWeavingDiaQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  // get gsm data
  const { data: gsmData, isLoading: gsmLoading } = useGetWeavingGsmQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  //get design data
  const { data: designData, isLoading: designLoading } =
    useGetWeavingDesignQuery(undefined, { refetchOnMountOrArgChange: true });
  // get unit data
  const { data: unitData, isLoading: unitLoading } = useGetWeavingUnitQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  // useEffect(() => {
  //   const fabricQuantity = +fabricConsumption * +gmtQty;
  //   console.log(fabricQuantity);
  //   dispatch(setEditOrderReceive({ key: "fabricQty", value: fabricQuantity }));
  // }, [gmtQty, fabricConsumption]);
  return (
    <div>
      {/* order info */}
      <CustomAppBar title={"input fields"} />
      <Box
        sx={{
          p: 1,
          border: "1px dashed grey",
          mr: "1px",
          mt: 1.5,
          position: "relative",
        }}
      >
        <FieldSet text={"order information"} />
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label={"Order Number"}
              name="orderNumber"
              optionId={"or_style_no"}
              optionLabel={"or_style_no"}
              value={orderNumber}
              setReduxState={setEditOrderReceive}
              options={data ?? []}
              loading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label={"Order Type"}
              name="orderType"
              optionId={"ordt_id"}
              optionLabel={"ordt_desc"}
              value={orderType}
              setReduxState={setEditOrderReceive}
              options={orderTypeData ?? []}
              loading={orderTypeLoading}
              required
              disabled={isDisabled}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label={"Customer Name"}
              name="customer"
              optionId={"nBuyer_ID"}
              optionLabel={"cBuyer_Name"}
              value={customer}
              options={customerData ?? []}
              setReduxState={setEditOrderReceive}
              loading={customerDataLoading}
              required
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label={"Buyer"}
              name="buyer"
              optionId={"buyer_ID"}
              optionLabel={"buyer_name"}
              value={buyer}
              setReduxState={setEditOrderReceive}
              options={buyerData ?? []}
              loading={buyerLoading}
              required
              disabled={isDisabled}
            />
          </Grid>
          {/* <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Order No"}
              name="orderNo"
              value={orderNo}
              setReduxState={setEditOrderReceive}
              required
              disabled={isDisabled}
            />
          </Grid> */}
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label={"GMT Color"}
              name="color"
              optionId={"col_ID"}
              optionLabel={"color"}
              value={color}
              setReduxState={setEditOrderReceive}
              options={colorData ?? []}
              loading={colorLoading}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"GMT Name"}
              name="gmtName"
              value={gmtName}
              setReduxState={setEditOrderReceive}
              required
              disabled={isDisabled}
            />
          </Grid>
          {/* <Grid item xs={12} sm={4}  >
            <CustomTextInput
              label={"GMT Qty"}
              name="gmtQty"
              type="number"
              value={gmtQty}
              setReduxState={setEditOrderReceive}
              required
            />
          </Grid> */}
        </Grid>
      </Box>
      {/* fabric info */}
      <Box
        sx={{
          p: 1,
          border: "1px dashed grey",
          mr: "1px",
          mt: 1.5,
          position: "relative",
        }}
      >
        <FieldSet text={"fabric information"} />
        {/* <CustomAppBar title={"input fields"} /> */}
        <Grid container spacing={1} mt={"5px"}>
          {/* <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label={"Fabric Type"}
              name="fabricType"
              optionId={"ft_id"}
              optionLabel={"ft_description"}
              value={fabricType}
              options={fabricTypeData ?? []}
              setReduxState={setEditOrderReceive}
              loading={fabricTypeLoading}
              required
            />
          </Grid> */}
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label={"Design"}
              name="design"
              optionId={"fd_id"}
              optionLabel={"fd_design"}
              value={design}
              options={designData ?? []}
              setReduxState={setEditOrderReceive}
              loading={designLoading}
              required
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label={"Fabric Composition"}
              name="fabricComposition"
              optionId={"fcom_id"}
              optionLabel={"fcom_composition"}
              value={fabricComposition}
              setReduxState={setEditOrderReceive}
              options={compositionData ?? []}
              loading={compositionLoading}
              required
              disabled={isDisabled}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label={"Fabric Construction"}
              name="fabricConstruction"
              optionId={"fc_id"}
              optionLabel={"fc_construction"}
              value={fabricConstruction}
              options={constructionData ?? []}
              setReduxState={setEditOrderReceive}
              loading={constructionLoading}
              required
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label={"Finished Dia"}
              name="dia"
              optionId={"dia_id"}
              optionLabel={"dia_name"}
              value={dia}
              options={diaData ?? []}
              setReduxState={setEditOrderReceive}
              loading={diaLoading}
              required
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label={"Fabric Color"}
              name="fabricColor"
              optionId={"col_ID"}
              optionLabel={"color"}
              value={fabricColor}
              setReduxState={setEditOrderReceive}
              options={colorData ?? []}
              loading={colorLoading}
              required
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label={"GSM"}
              name="gsm"
              optionId={"gsm_id"}
              optionLabel={"gsm_description"}
              value={gsm}
              options={gsmData ?? []}
              setReduxState={setEditOrderReceive}
              loading={gsmLoading}
              required
              disabled={isDisabled}
            />
          </Grid>
          {/* <Grid item xs={12} sm={4}  >
            <CustomTextInput
              label={"Fabric Consumption"}
              name="fabricConsumption"
              type="number"
              value={fabricConsumption}
              setReduxState={setEditOrderReceive}
              required
            />
          </Grid> */}
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Fabric Qty"}
              name="fabricQty"
              type="number"
              value={fabricQty}
              setReduxState={setEditOrderReceive}
              required
              // disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label={"Unit"}
              name="unit"
              optionId={"unit_id"}
              optionLabel={"unit_name"}
              value={unit}
              options={unitData ?? []}
              setReduxState={setEditOrderReceive}
              loading={unitLoading}
              required
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <CustomDatePicker
              label={"Order Received Date"}
              name="orderReceiveDate"
              value={orderReceiveDate}
              setReduxState={setEditOrderReceive}
              required
              disableFuture
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <CustomDatePicker
              label={"Delivery Date"}
              name="deliveryDate"
              value={deliveryDate}
              setReduxState={setEditOrderReceive}
              disablePast
              required
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextInput
              label={"Remarks"}
              name="remarks"
              multiline
              value={remarks}
              setReduxState={setEditOrderReceive}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EditOrderReceivingInput;

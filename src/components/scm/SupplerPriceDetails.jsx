import { Box, Grid, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextInput from "../inputs/CustomTextInput";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomAppBar from "../common/CustomAppBar";
import CustomDatePicker from "../inputs/CustomDatePicker";
import {
  useGetCostQuery,
  useGetPaymentQuery,
  useGetPriceQuery,
  useGetQualityQuery,
  useGetShipQuery,
  useGetSupplerQuery,
} from "../../redux/features/scm/priceComparison/queryPriceComparison";
import { checkValidation } from "./priceComparison/numberValidation";
import { setPriceComparison } from "../../redux/features/scm/priceComparison/priceComparisonSlice";
import { useSelector } from "react-redux";

const SupplerPriceDetails = () => {
  const {
    mainCategory,
    initialPrice,
    finalPrice,
    supplier,
    paymentType,
    priceTerm,
    shipMode,
    productionLeadTime,
    testCost,
    qualityStatus,
    moq,
    priceValidity,
    upCharge,
  } = useSelector((state) => state.priceComparison);

  const { data: supplierData, isLoading: isSupplierLoading } =
    useGetSupplerQuery(mainCategory?.nMainCategory_ID);
  const { data: payment, isLoading: isPaymentLoading } = useGetPaymentQuery();
  const { data: price, isLoading: isPriceLoading } = useGetPriceQuery();
  const { data: ship, isLoading: isShipLoading } = useGetShipQuery();
  const { data: cost, isLoading: isCostLoading } = useGetCostQuery();
  const { data: quality, isLoading: isQualityLoading } = useGetQualityQuery();

  return (
    <>
      <Box sx={{ mt: 1 }}></Box>
      <CustomAppBar title={"Supplier Price Details"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Supplier"}
              name="supplier"
              options={supplierData ?? []}
              value={supplier}
              loading={isSupplierLoading}
              optionLabel={"cSupName"}
              optionId={"supplierID"}
              setReduxState={setPriceComparison}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Payment Type"}
              name="paymentType"
              options={payment ? payment : []}
              value={paymentType}
              loading={isPaymentLoading}
              optionLabel={"pt_desc"}
              optionId={"pt_id"}
              setReduxState={setPriceComparison}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Price Term"}
              name="priceTerm"
              options={price ? price : []}
              value={priceTerm}
              loading={isPriceLoading}
              optionLabel={"pm_desc"}
              optionId={"pm_id"}
              setReduxState={setPriceComparison}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Ship Mode"}
              name="shipMode"
              options={ship ? ship : []}
              value={shipMode}
              loading={isShipLoading}
              optionLabel={"sm_desc"}
              optionId={"sm_id"}
              setReduxState={setPriceComparison}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomTextInput
              label={"Initial Price"}
              type="number"
              name="initialPrice"
              value={initialPrice}
              setReduxState={setPriceComparison}
              required={true}
            />
            {checkValidation(initialPrice, 12)?.map((message, i) => (
              <small key={i} style={{ color: "red" }}>
                {message}
                <br />
              </small>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomTextInput
              label={"Final Price"}
              type="number"
              name="finalPrice"
              value={finalPrice}
              setReduxState={setPriceComparison}
              required={true}
            />
            {checkValidation(finalPrice, 12)?.map((message, i) => (
              <small key={i} style={{ color: "red" }}>
                {message}
                <br />
              </small>
            ))}
          </Grid>
        </Grid>

        {/* second line */}
        <Grid container spacing={1} my={1}>
          <Grid item xs={12} sm={6} md={2}>
            <CustomTextInput
              label={"Production Lead Time"}
              type="number"
              name="productionLeadTime"
              value={productionLeadTime}
              setReduxState={setPriceComparison}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Test Cost"}
              name="testCost"
              options={cost ? cost : []}
              value={testCost}
              loading={isCostLoading}
              optionLabel={"qca_desc"}
              optionId={"qca_id"}
              setReduxState={setPriceComparison}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Quality Status"}
              name="qualityStatus"
              options={quality ? quality : []}
              value={qualityStatus}
              loading={isQualityLoading}
              optionLabel={"tc_desc"}
              optionId={"tc_id"}
              setReduxState={setPriceComparison}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomTextInput
              label={"MOQ"}
              name="moq"
              value={moq}
              setReduxState={setPriceComparison}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomDatePicker
              label={"Price Validity"}
              name="priceValidity"
              required={true}
              disablePast={true}
              setReduxState={setPriceComparison}
              value={priceValidity}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomTextInput
              label={"Up Charge"}
              name="upCharge"
              type="number"
              value={upCharge}
              setReduxState={setPriceComparison}
              required={true}
            />
          </Grid>
          {/* <Grid item xs={12} sx={{ display: "none" }}>
            <CustomTextInput
              multiline={true}
              label={"Remarks"}
              name="remarks"
              // register={register}
              readOnly={false}
              value={remarks}
              setValue={setValue}
              setReduxState={setPriceComparison}
              // required={true}
            />
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
};

export default SupplerPriceDetails;

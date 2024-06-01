import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomTextInput from "../inputs/CustomTextInput";
import {
  useGetCostQuery,
  useGetPaymentQuery,
  useGetPriceQuery,
  useGetQualityQuery,
  useGetShipQuery,
  useGetSupplerQuery,
} from "../../redux/features/scm/priceComparison/queryPriceComparison";
import CustomDatePicker from "../inputs/CustomDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { setPriceComparison } from "../../redux/features/scm/priceComparison/priceComparisonSlice";
import { checkValidation } from "./priceComparison/numberValidation";

const EditSupplerPriceDetails = () => {
  const dispatch = useDispatch();
  const {
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
    remarks,
    selectedTableRow,
  } = useSelector((state) => state.priceComparison);

  const { data: suppliers, isLoading: isSupplierLoading } = useGetSupplerQuery(
    selectedTableRow?.nMainCategory_ID
  );
  const { data: payments, isLoading: isPaymentLoading } = useGetPaymentQuery();
  const { data: prices, isLoading: isPriceLoading } = useGetPriceQuery();
  const { data: ship, isLoading: isShipLoading } = useGetShipQuery();
  const { data: cost, isLoading: isCostLoading } = useGetCostQuery();
  const { data: quality, isLoading: isQualityLoading } = useGetQualityQuery();

  useEffect(() => {
    if (selectedTableRow) {
      const {
        nCode,
        cSupName,
        pt_id,
        pt_desc,
        pm_id,
        pm_desc,
        sm_id,
        sm_desc,
        initial_price,
        final_price,
        production_lead_time,
        qca_id,
        qca_desc,
        tc_id,
        tc_desc,
        moq,
        price_validity,
        upcharge,
        remarks,
      } = selectedTableRow;
      dispatch(
        setPriceComparison({
          key: "supplier",
          value: { supplierID: nCode, cSupName: cSupName },
        })
      );
      dispatch(
        setPriceComparison({ key: "paymentType", value: { pt_id, pt_desc } })
      );
      dispatch(
        setPriceComparison({ key: "priceTerm", value: { pm_id, pm_desc } })
      );
      dispatch(
        setPriceComparison({ key: "shipMode", value: { sm_id, sm_desc } })
      );
      dispatch(
        setPriceComparison({
          key: "initialPrice",
          value: initial_price ?? "",
        })
      );
      dispatch(
        setPriceComparison({
          key: "finalPrice",
          value: final_price ?? "",
        })
      );
      dispatch(
        setPriceComparison({
          key: "productionLeadTime",
          value: production_lead_time ?? "",
        })
      );
      dispatch(
        setPriceComparison({ key: "testCost", value: { qca_id, qca_desc } })
      );
      dispatch(
        setPriceComparison({
          key: "qualityStatus",
          value: { tc_id, tc_desc },
        })
      );
      dispatch(setPriceComparison({ key: "moq", value: moq ?? "" }));
      dispatch(
        setPriceComparison({
          key: "priceValidity",
          value: price_validity,
        })
      );
      dispatch(
        setPriceComparison({
          key: "upCharge",
          value: upcharge ?? "",
        })
      );
      dispatch(
        setPriceComparison({
          key: "remarks",
          value: remarks,
        })
      );
    }
  }, [selectedTableRow]);

  return (
    <>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"Edit Supplier Price Details"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Supplier"}
              name="supplier"
              options={suppliers ?? []}
              value={supplier}
              loading={isSupplierLoading}
              optionLabel={"cSupName"}
              optionId={"supplierID"}
              setReduxState={setPriceComparison}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Payment Type"}
              name="paymentType"
              options={payments ?? []}
              value={paymentType}
              loading={isPaymentLoading}
              optionLabel={"pt_desc"}
              optionId={"pt_id"}
              setReduxState={setPriceComparison}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Price Term"}
              name="priceTerm"
              options={prices ?? []}
              value={priceTerm}
              loading={isPriceLoading}
              optionLabel={"pm_desc"}
              optionId={"pm_id"}
              setReduxState={setPriceComparison}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Ship Mode"}
              name="shipMode"
              options={ship ?? []}
              value={shipMode}
              loading={isShipLoading}
              optionLabel={"sm_desc"}
              optionId={"sm_id"}
              setReduxState={setPriceComparison}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomTextInput
              label={"Initial Price"}
              type="number"
              name="initialPrice"
              value={initialPrice}
              setReduxState={setPriceComparison}
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
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Test Cost"}
              name="testCost"
              options={cost ?? []}
              value={testCost}
              loading={isCostLoading}
              optionLabel={"qca_desc"}
              optionId={"qca_id"}
              setReduxState={setPriceComparison}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Quality Status"}
              name="qualityStatus"
              options={quality ?? []}
              value={qualityStatus}
              loading={isQualityLoading}
              optionLabel={"tc_desc"}
              optionId={"tc_id"}
              setReduxState={setPriceComparison}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomTextInput
              label={"MOQ"}
              name="moq"
              value={moq}
              setReduxState={setPriceComparison}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomDatePicker
              label={"Price Validity"}
              name="priceValidity"
              required={true}
              disablePast={true}
              value={priceValidity}
              setReduxState={setPriceComparison}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomTextInput
              label={"Up Charge"}
              name="upCharge"
              type="number"
              value={upCharge}
              setReduxState={setPriceComparison}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextInput
              multiline={true}
              label={"Remarks"}
              name="remarks"
              readOnly={false}
              value={remarks}
              setReduxState={setPriceComparison}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EditSupplerPriceDetails;

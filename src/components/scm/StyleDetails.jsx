import { Box, Grid } from "@mui/material";
import React from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomDatePicker from "../inputs/CustomDatePicker";
import CustomTextInput from "../inputs/CustomTextInput";
import {
  useGetCurrencyForSupplierQuery,
  useGetStyleDetailsQuery,
  useGetStyleForSupplierQuery,
} from "../../redux/features/scm/priceComparison/queryPriceComparison";
import { setPriceComparison } from "../../redux/features/scm/priceComparison/priceComparisonSlice";
import { useSelector } from "react-redux";

const StyleDetails = () => {
  const { style, currency, bookingDate, sewingStartDate, isDisabled } =
    useSelector((state) => state.priceComparison);

  const { data, isLoading } = useGetStyleForSupplierQuery();
  const { data: currencyData, isLoading: isCurrencyLoading } =
    useGetCurrencyForSupplierQuery();
  const { data: StyleDetails } = useGetStyleDetailsQuery(style?.nStyleID);

  return (
    <>
      <CustomAppBar title={"Style Details"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Style No"}
              name="style"
              options={data ?? []}
              value={style}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              loading={isLoading}
              setReduxState={setPriceComparison}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"Booking Date"}
              name="bookingDate"
              required={true}
              disablePast={true}
              value={bookingDate}
              setReduxState={setPriceComparison}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"Sewing Start Date"}
              name="sewingStartDate"
              required={true}
              disablePast={true}
              setReduxState={setPriceComparison}
              value={sewingStartDate}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Buyer"}
              value={
                style === null
                  ? ""
                  : StyleDetails && StyleDetails[0]?.cBuyer_Name
              }
              name="buyer"
              setReduxState={setPriceComparison}
              disabled={true}
            />
          </Grid>
        </Grid>

        {/* second line */}
        <Grid container spacing={1} my={1}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Garments Type"}
              value={
                style === null ? "" : StyleDetails && StyleDetails[0]?.cGmetDis
              }
              name="garmentsType"
              setReduxState={setPriceComparison}
              disabled={true}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={1.5}>
            {" "}
            <CustomTextInput
              label={"Season"}
              value={
                style === null
                  ? ""
                  : StyleDetails && StyleDetails[0]?.cSeason_Name
              }
              readOnly={true}
              name="season"
              setReduxState={setPriceComparison}
              disabled={true}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={1.5}>
            <CustomAutocomplete
              label={"Currency"}
              name="currency"
              options={currencyData ?? []}
              value={currency}
              optionLabel={"cCurdes"}
              optionId={"cCurCode"}
              loading={isCurrencyLoading}
              setReduxState={setPriceComparison}
              required={true}
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <CustomTextInput
              label={"Style Type"}
              value={
                style === null
                  ? ""
                  : StyleDetails && StyleDetails[0]?.cStyleType
              }
              name="styleType"
              setReduxState={setPriceComparison}
              disabled={true}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={1.5}>
            <CustomTextInput
              label={"Order Type"}
              value={
                style === null ? "" : StyleDetails && StyleDetails[0]?.ordt_desc
              }
              name="orderType"
              setReduxState={setPriceComparison}
              disabled={true}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={1.5}>
            <CustomTextInput
              label={"Total GMT Qty"}
              value={
                style === null
                  ? ""
                  : StyleDetails && StyleDetails[0]?.nTotOrdQty
              }
              name="totalGmtQty"
              setReduxState={setPriceComparison}
              disabled={true}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StyleDetails;

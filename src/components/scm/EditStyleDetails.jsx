import React, { useEffect, useState } from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomDatePicker from "../inputs/CustomDatePicker";
import CustomTextInput from "../inputs/CustomTextInput";
import {
  useGetCsNoQuery,
  useGetCurrencyForSupplierQuery,
  useGetStyleDetailsQuery,
  useGetStyleForSupplierQuery,
} from "../../redux/features/scm/priceComparison/queryPriceComparison";
import dayjs from "dayjs";
import { formateDate } from "../../utils/formateDate";
import { useDispatch, useSelector } from "react-redux";
import { setPriceComparison } from "../../redux/features/scm/priceComparison/priceComparisonSlice";

const EditStyleDetails = ({ isCreatePage }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { style, csNo, currency, selectedTableRow } = useSelector(
    (state) => state.priceComparison
  );

  const { data, isLoading } = useGetStyleForSupplierQuery();

  const { cStyleNo, nStyleID, booking_date, sewing_start_date } =
    selectedTableRow || {};
  const { data: StyleDetails } = useGetStyleDetailsQuery(nStyleID, {
    refetchOnMountOrArgChange: true,
  });
  const { data: currencyData, isLoading: isCurrencyLoading } =
    useGetCurrencyForSupplierQuery();
  const { data: csData } = useGetCsNoQuery(user?.userName, {
    refetchOnMountOrArgChange: true,
  });

  const curr = selectedTableRow?.currency
    ? {
        cCurCode: selectedTableRow?.currency,
        cCurdes: selectedTableRow?.currency,
      }
    : null;

  const styl = cStyleNo ? { cStyleNo: cStyleNo, nStyleID: nStyleID } : null;
  useEffect(() => {
    dispatch(setPriceComparison({ key: "currency", value: curr }));
    dispatch(setPriceComparison({ key: "style", value: styl }));
    dispatch(setPriceComparison({ key: "bookingDate", value: booking_date }));
    dispatch(
      setPriceComparison({ key: "sewingStartDate", value: sewing_start_date })
    );
  }, [selectedTableRow]);

  return (
    <>
      <CustomAppBar title={"Edit Style Details"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        {!isCreatePage && (
          <div style={{ margin: "10px 0px" }}>
            <CustomAutocomplete
              options={csData ?? []}
              label={"CS NO"}
              name="csNo"
              optionId={"pc_ref_no"}
              optionLabel={"pc_ref_no"}
              setReduxState={setPriceComparison}
              value={csNo}
            />
          </div>
        )}
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Style No"}
              name="style"
              options={data ?? []}
              value={style}
              required={true}
              disabled={true}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              setReduxState={setPriceComparison}
              loading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"Booking Date"}
              name="bookingDate"
              value={
                selectedTableRow?.booking_date
                  ? dayjs(formateDate(selectedTableRow?.booking_date))
                  : null
              }
              setReduxState={setPriceComparison}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"Sewing Start Date"}
              name="sewingStartDate"
              value={
                selectedTableRow?.sewing_start_date
                  ? dayjs(formateDate(selectedTableRow?.sewing_start_date))
                  : null
              }
              setReduxState={setPriceComparison}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Buyer"}
              value={StyleDetails && nStyleID && StyleDetails[0]?.cBuyer_Name}
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
              value={StyleDetails && nStyleID && StyleDetails[0]?.cGmetDis}
              name="garmentsType"
              setReduxState={setPriceComparison}
              disabled={true}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={1.5}>
            <CustomTextInput
              label={"Season"}
              value={StyleDetails && nStyleID && StyleDetails[0]?.cSeason_Name}
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
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <CustomTextInput
              label={"Style Type"}
              value={StyleDetails && nStyleID && StyleDetails[0]?.cStyleType}
              name="styleType"
              setReduxState={setPriceComparison}
              disabled={true}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={1.5}>
            <CustomTextInput
              label={"Order Type"}
              value={StyleDetails && nStyleID && StyleDetails[0]?.ordt_desc}
              name="orderType"
              setReduxState={setPriceComparison}
              disabled={true}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={1.5}>
            <CustomTextInput
              label={"Total GMT Qty"}
              value={StyleDetails && nStyleID && StyleDetails[0]?.nTotOrdQty}
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

export default EditStyleDetails;

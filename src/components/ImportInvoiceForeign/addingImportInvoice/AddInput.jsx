import React, { useEffect } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import { setForeignInvoice } from "../../../redux/features/commercial/importInvoiceForeign/foreignSlice";
import { useGetComShipModeQuery } from "../../../redux/features/commercial/contract/queryContract";
import { useGetUnitQuery } from "../../../redux/features/commercial/importInvoiceForeign/queryforeign";

const AddInput = () => {
  const dispatch = useDispatch();
  const {
    addGrnList,
    adjustments,
    invoiceValue,
    agent,
    docsDate,
    unit,
    MVesselName,
    originalDate,
    shipmentMode,
    MVesselETD,
    originalToCF,
    awbNo,
    FVesselName,
    goodsInHouse,
    blDate,
    FVesselETD,
    billOfEntry,
    containerNo,
    carrierName,
    landingPort,
    billOfEntryNo,
    passBookPageNo,
    FVesselETA,
    invoiceQty,
  } = useSelector((state) => state.foreignInvoice);

  //get shipment mode
  const { data: shipmentModeData, isLoading: shipmentModeLoading } =
    useGetComShipModeQuery();
  //get shipment mode
  const { data: unitData, isLoading: unitLoading } = useGetUnitQuery();

  const invoiceValueL =
    addGrnList?.reduce((a, c) => a + c.imd_value, 0) + +adjustments;
  const invoiceQtyL = addGrnList?.reduce((a, c) => a + c.imd_qty, 0);

  useEffect(() => {
    dispatch(setForeignInvoice({ key: "invoiceValue", value: invoiceValueL }));
  }, [invoiceValueL]);
  useEffect(() => {
    dispatch(setForeignInvoice({ key: "invoiceQty", value: invoiceQtyL }));
  }, [invoiceQtyL]);

  return (
    <>
      <CustomAppBar title={"input fields"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mb: 0.5 }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Invoice Value"}
              value={invoiceValue}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Agent"}
              name="agent"
              value={agent}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Invoice Qty"}
              value={invoiceQty}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Unit"}
              name="unit"
              value={unit}
              options={unitData?.data ?? []}
              optionLabel={"unit"}
              optionId={"nUnitID"}
              loading={unitLoading}
              setReduxState={setForeignInvoice}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"N.N Docs Date"}
              name="docsDate"
              value={docsDate}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"M.Vessel Name"}
              name="MVesselName"
              value={MVesselName}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"Original Date"}
              name="originalDate"
              value={originalDate}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Shipment Mode"}
              name="shipmentMode"
              options={shipmentModeData?.data ?? []}
              value={shipmentMode}
              optionLabel={"shipMode_Name"}
              optionId={"shipMode_Name"}
              loading={shipmentModeLoading}
              setReduxState={setForeignInvoice}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <CustomDatePicker
              label={"M.Vessel ETD"}
              name="MVesselETD"
              value={MVesselETD}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <CustomDatePicker
              label={"Original To C&F"}
              name="originalToCF"
              value={originalToCF}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"BL/AWB No"}
              name="awbNo"
              value={awbNo}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"F.Vessel Name"}
              name="FVesselName"
              value={FVesselName}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"Goods Inhouse"}
              name="goodsInHouse"
              value={goodsInHouse}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"BL Date"}
              name="blDate"
              value={blDate}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"F.Vessel ETD"}
              name="FVesselETD"
              value={FVesselETD}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"Bill of Entry"}
              name="billOfEntry"
              value={billOfEntry}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Container No"}
              name="containerNo"
              value={containerNo}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Carrier Name"}
              name="carrierName"
              value={carrierName}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Landing Port"}
              name="landingPort"
              value={landingPort}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <CustomTextInput
              label={"Bill of Entry No."}
              name="billOfEntryNo"
              value={billOfEntryNo}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <CustomTextInput
              label={"Pass Book Page No."}
              name="passBookPageNo"
              value={passBookPageNo}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"F.Vessel ETA"}
              name="FVesselETA"
              value={FVesselETA}
              setReduxState={setForeignInvoice}
              required
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddInput;

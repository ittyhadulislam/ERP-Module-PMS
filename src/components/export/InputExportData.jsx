import React from "react";
import { Box, Grid } from "@mui/material";
import CustomTextInput from "../inputs/CustomTextInput";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomDatePicker from "../inputs/CustomDatePicker";
import CustomAppBar from "../common/CustomAppBar";
import {
  useGetExportBuyerQuery,
  useGetExportColorQuery,
  useGetExportCompanyQuery,
  useGetExportDeliverToQuery,
  useGetExportDepoNameQuery,
  useGetExportFloorQuery,
  useGetExportPoQuery,
  useGetExportProductionCountryQuery,
  useGetExportSewingFactoryQuery,
  useGetExportShipCountryQuery,
  useGetExportShipModeQuery,
  useGetExportStyleQuery,
} from "../../redux/features/export/exportChallan/queryExportChallan";
import { useSelector } from "react-redux";
const InputExportData = ({ localState, setLocalState }) => {
  const { user } = useSelector((state) => state.auth);
  // Get Export Sewing Factory Query
  const { data: sewingFactoryData, isLoading: sewingFactoryLoading } =
    useGetExportSewingFactoryQuery();
  // Get Export Buyer Query
  const { data: buyerData, isLoading: buyerLoading } = useGetExportBuyerQuery(
    localState?.sewingFactory?.nCompanyID
  );
  // Get Export Style Query
  const { data: styleData, isLoading: styleLoading } = useGetExportStyleQuery({
    id: localState?.sewingFactory?.nCompanyID,
    buyer: localState?.buyer?.nBuyer_ID,
  });

  // Get Export Deliver To Query
  const { data: deliveryToData, isLoading: deliveryToLoading } =
    useGetExportDeliverToQuery();

  // Get Export Depo Name Query
  const { data: depoNameData, isLoading: depoNameLoading } =
    useGetExportDepoNameQuery();
  // Get Export Po Query
  const { data: poData, isLoading: poLoading } = useGetExportPoQuery({
    id: localState?.sewingFactory?.nCompanyID,
    style: localState?.style?.nStyleID,
  });
  // Get Export Production Country Query
  const { data: productionCountryData, isLoading: productionCountryLoading } =
    useGetExportProductionCountryQuery({
      id: localState?.sewingFactory?.nCompanyID,
      style: localState?.style?.nStyleID,
      po: localState?.poNo?.poLot,
    });
  // Get Export Ship Country Query
  const { data: shipCountryData, isLoading: shipCountryLoading } =
    useGetExportShipCountryQuery();
  // Get Export Color Query
  const { data: colorData, isLoading: colorLoading } = useGetExportColorQuery({
    id: localState?.sewingFactory?.nCompanyID,
    style: localState?.style?.nStyleID,
    po: localState?.poNo?.poLot,
    country: localState?.productionCountry?.nConCode,
  });
  // Get Export Company Query
  const { data: companyData, isLoading: companyLoading } =
    useGetExportCompanyQuery();
  // Get Export Floor Query
  const { data: floorData, isLoading: floorLoading } = useGetExportFloorQuery(
    localState?.sewingFactory?.nCompanyID
  );
  // Get Export Ship Mode Query
  const { data: shipModeData, isLoading: shipModeLoading } =
    useGetExportShipModeQuery();
  // UI

  return (
    <>
      <CustomAppBar title={"INPUT EXPORT DATA"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4}>
                <CustomAutocomplete
                  label={"Sewing Factory"}
                  optionLabel={"cCmpName"}
                  optionId={"nCompanyID"}
                  name="sewingFactory"
                  setLocalState={setLocalState}
                  options={sewingFactoryData ?? []}
                  value={localState.sewingFactory}
                  loading={sewingFactoryLoading}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomAutocomplete
                  label={"Buyer"}
                  optionLabel={"cBuyer_Name"}
                  optionId={"nBuyer_ID"}
                  name="buyer"
                  setLocalState={setLocalState}
                  options={localState.sewingFactory ? buyerData ?? [] : []}
                  value={localState.buyer}
                  loading={buyerLoading}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomAutocomplete
                  label={"Style"}
                  optionLabel={"cStyleNo"}
                  optionId={"nStyleID"}
                  name="style"
                  setLocalState={setLocalState}
                  options={localState.buyer ? styleData ?? [] : []}
                  value={localState.style}
                  loading={styleLoading}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomDatePicker
                  label={"Date"}
                  name={"date"}
                  futureDate={1}
                  prevDate={10}
                  setLocalState={setLocalState}
                  value={localState.date}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomAutocomplete
                  label={"PO No"}
                  optionLabel={"pO_No"}
                  optionId={"pO_No"}
                  name="poNo"
                  setLocalState={setLocalState}
                  options={localState.style ? poData ?? [] : []}
                  value={localState.poNo}
                  loading={poLoading}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomAutocomplete
                  label={"Production Country"}
                  optionLabel={"cConDes"}
                  optionId={"nConCode"}
                  name="productionCountry"
                  setLocalState={setLocalState}
                  options={localState.poNo ? productionCountryData ?? [] : []}
                  value={localState.productionCountry}
                  loading={productionCountryLoading}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomAutocomplete
                  label={"Ship Country"}
                  optionLabel={"cConDes"}
                  optionId={"nConCode"}
                  name="shipCountry"
                  setLocalState={setLocalState}
                  options={shipCountryData ?? []}
                  value={localState.shipCountry}
                  loading={shipCountryLoading}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomAutocomplete
                  label={"Color"}
                  optionLabel={"cColour"}
                  optionId={"nColNo"}
                  name="color"
                  setLocalState={setLocalState}
                  options={localState.productionCountry ? colorData ?? [] : []}
                  value={localState.color}
                  loading={colorLoading}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomAutocomplete
                  label={"Company"}
                  optionLabel={"cCmpName"}
                  optionId={"nCompanyID"}
                  name="company"
                  setLocalState={setLocalState}
                  options={companyData ?? []}
                  value={localState.company}
                  loading={companyLoading}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomAutocomplete
                  label={"Floor"}
                  optionLabel={"cFloor_Descriptin"}
                  optionId={"nFloor"}
                  name="floor"
                  setLocalState={setLocalState}
                  options={localState.sewingFactory ? floorData ?? [] : []}
                  value={localState.floor}
                  loading={floorLoading}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <CustomAutocomplete
                  label={"Ship Mode"}
                  optionLabel={"sm_type"}
                  optionId={"sm_id"}
                  name="shipMode"
                  setLocalState={setLocalState}
                  options={shipModeData ?? []}
                  value={localState.shipMode}
                  loading={shipModeLoading}
                  required={true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4}>
                <CustomAutocomplete
                  label={"Delivery To"}
                  optionLabel={"exp_to"}
                  optionId={"exp_id"}
                  name="deliveryTo"
                  setLocalState={setLocalState}
                  options={deliveryToData ?? []}
                  value={localState.deliveryTo}
                  loading={deliveryToLoading}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomAutocomplete
                  label={"Depo Name"}
                  optionLabel={"depo_name"}
                  optionId={"depo_id"}
                  name="depoName"
                  setLocalState={setLocalState}
                  options={depoNameData ?? []}
                  value={localState.depoName}
                  loading={depoNameLoading}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomTextInput
                  label={"Transport"}
                  name="transport"
                  // isNumber={true}
                  // maxLength={6}
                  setLocalState={setLocalState}
                  value={localState.transport}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomTextInput
                  label={"Track/Contain V/C No"}
                  name="trackVCno"
                  // isNumber={true}
                  // maxLength={6}
                  setLocalState={setLocalState}
                  value={localState.trackVCno}
                  required={true}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <CustomTextInput
                  label={"Driving License"}
                  name="driveLicense"
                  // isNumber={true}
                  // maxLength={6}
                  setLocalState={setLocalState}
                  value={localState.driveLicense}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomTextInput
                  label={"Driver Name"}
                  name="driverName"
                  // isNumber={true}
                  // maxLength={6}
                  setLocalState={setLocalState}
                  value={localState.driverName}
                  required={true}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <CustomTextInput
                  label={"Invoice No"}
                  name="invoiceNo"
                  // isNumber={true}
                  // maxLength={6}
                  setLocalState={setLocalState}
                  value={localState.invoiceNo}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomTextInput
                  label={"Mobile No"}
                  name="mobileNo"
                  // isNumber={true}
                  // maxLength={15}
                  setLocalState={setLocalState}
                  value={localState.mobileNo}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomTextInput
                  label={"GPS"}
                  name="gps"
                  // isNumber={true}
                  // maxLength={6}
                  setLocalState={setLocalState}
                  value={localState.gps}
                  required={true}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <CustomTextInput
                  label={"Lock No"}
                  name="lockNo"
                  // isNumber={true}
                  // maxLength={6}
                  setLocalState={setLocalState}
                  value={localState.lockNo}
                  required={true}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={8}>
                <CustomTextInput
                  label={"Remarks"}
                  name="remarks"
                  maxLength={350}
                  multiline
                  setLocalState={setLocalState}
                  value={localState.remarks}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InputExportData;

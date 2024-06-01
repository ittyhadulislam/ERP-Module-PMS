import React, { useEffect } from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import CustomTextInput from "../inputs/CustomTextInput";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomDatePicker from "../inputs/CustomDatePicker";
import { setExportInvoice } from "../../redux/features/commercial/exportInvoice/exportInvoiceSlice";
import { useLazyGetMasterLcNoQuery } from "../../redux/features/commercial/backToBackLC/queryBackToBackLC";
import { useSelector } from "react-redux";
import {
  useGetAllCompanyQuery,
  useGetFinalDestinationQuery,
  useGetPortOfLoadingQuery,
} from "../../redux/features/commercial/exportInvoice/queryExportInvoice";
import {
  useGetComPaymentTermQuery,
  useGetComShipModeQuery,
  useLazyGetComBuyerQuery,
} from "../../redux/features/commercial/contract/queryContract";

const ExportInvoiceInput = () => {
  const {
    company,
    contract,
    factory,
    consignee,
    shipMode,
    portOfLanding,
    finalDestination,
    paymentTerm,
    invoice,
    invoiceValue,
    exchangeRate,
    invoicePCSQty,
    itemDescription,
    exp,
    issuingBank,
    notifyParty,
    bl,
    shippingBill,
    carrierBy,
    passBookPage,
    date,
    blDate,
    shippingBillDate,
  } = useSelector((state) => state.exportInvoice);
  // get master lc
  const [getLcData, { data: masterLcData, isLoading: masterLcLoading }] =
    useLazyGetMasterLcNoQuery();
  // get all company
  const { data: factoryData, isLoading: factoryLoading } =
    useGetAllCompanyQuery();
  // get buyer
  const [getBuyer, { data: buyerData, isLoading: buyerLoading }] =
    useLazyGetComBuyerQuery();
  // get ship mode
  const { data: shipModeData, isLoading: shipModeLoading } =
    useGetComShipModeQuery();
  // get port of loading
  const { data: loadingPortData, isLoading: loadingLoading } =
    useGetPortOfLoadingQuery();
  // get final destination
  const { data: finalDestinationData, isLoading: finalLoading } =
    useGetFinalDestinationQuery();
  // get payment term
  const { data: paymentTermData, isLoading: paymentTermLoading } =
    useGetComPaymentTermQuery();

  useEffect(() => {
    if (company) {
      getBuyer(company?.company_ID);
      // getData(company?.company_ID);
      getLcData(company?.company_ID);
    }
  }, [company]);
  return (
    <>
      <CustomAppBar title={"input fields"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mb: 0.5 }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Invoice"}
              name="invoice"
              value={invoice}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker
              label={"Invoice Date"}
              name="invoiceDate"
              setReduxState={setExportInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Invoice Value"}
              name="invoiceValue"
              value={invoiceValue}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Exchange Rate"}
              name="exchangeRate"
              value={exchangeRate}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Invoice PCS Qty."}
              name="invoicePCSQty"
              value={invoicePCSQty}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Item Description"}
              name="itemDescription"
              value={itemDescription}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"EXP"}
              name="exp"
              value={exp}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker
              label={"Date"}
              name="date"
              value={date}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              label={"Contract"}
              name="contract"
              options={company ? masterLcData?.data ?? [] : []}
              value={contract}
              optionLabel={"cContractNo"}
              optionId={"contract_Slno"}
              loading={masterLcLoading}
              setReduxState={setExportInvoice}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Issuing Bank"}
              name="issuingBank"
              value={issuingBank}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Notify Party"}
              name="notifyParty"
              value={notifyParty}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"B/L "}
              name="bl"
              value={bl}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker
              label={"B/ L Date"}
              name="blDate"
              value={blDate}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              label={"Factory"}
              name="factory"
              options={factoryData?.data ?? []}
              value={factory}
              optionLabel={"companyName"}
              optionId={"companyID"}
              loading={factoryLoading}
              setReduxState={setExportInvoice}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Consignee"}
              name="consignee"
              options={company ? buyerData?.data ?? [] : []}
              value={consignee}
              optionLabel={"buyer_Name"}
              optionId={"buyer_ID"}
              loading={buyerLoading}
              setReduxState={setExportInvoice}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Shipping Bill"}
              name="shippingBill"
              value={shippingBill}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker
              label={"Shipping Bill Date"}
              name="shippingBillDate"
              value={shippingBillDate}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Ship Mode"}
              name="shipMode"
              options={shipModeData?.data ?? []}
              value={shipMode}
              optionLabel={"shipMode_Name"}
              optionId={"shipMode_ID"}
              loading={shipModeLoading}
              setReduxState={setExportInvoice}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Port of Loading"}
              name="portOfLanding"
              options={loadingPortData?.data ?? []}
              value={portOfLanding}
              optionLabel={"p_name"}
              optionId={"p_code"}
              loading={loadingLoading}
              setReduxState={setExportInvoice}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Final Destination"}
              name="finalDestination"
              options={finalDestinationData?.data ?? []}
              value={finalDestination}
              optionLabel={"d_name"}
              optionId={"d_code"}
              loading={finalLoading}
              setReduxState={setExportInvoice}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Carrier By"}
              name="carrierBy"
              value={carrierBy}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Payment Terms"}
              name="paymentTerm"
              options={paymentTermData?.data ?? []}
              value={paymentTerm}
              optionLabel={"payment_Name"}
              optionId={"payment_ID"}
              loading={paymentTermLoading}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Pass Book Page"}
              name="passBookPage"
              value={passBookPage}
              setReduxState={setExportInvoice}
              required
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ExportInvoiceInput;

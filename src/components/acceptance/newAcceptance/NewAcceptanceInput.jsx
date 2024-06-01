import React, { useEffect } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import { setAcceptance } from "../../../redux/features/commercial/acceptance/acceptanceSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAcceptanceSupplierQuery,
  useLazyGetAcceptanceB2bQuery,
  useLazyGetAcceptanceInvoiceInfoQuery,
  useLazyGetAcceptancePaymentChangeQuery,
  useLazyGetInvoiceQuery,
  useLazyGetMasterLcByB2bQuery,
} from "../../../redux/features/commercial/acceptance/queryAcceptance";
import { useGetComPaymentTermQuery } from "../../../redux/features/commercial/contract/queryContract";

const NewAcceptanceInput = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth.user);
  const {
    supplier,
    b2bLc,
    invoiceNo,
    masterLc,
    paymentTerm,
    modeOfLC,
    acceptedDate,
    maturityDate,
    ref,
    remarks,
    exchangeRate,
    acceptedAmount,
    invoiceValue,
    submissionDate,
  } = useSelector((state) => state.acceptance);
  // get supplier
  const { data: supplierData, isLoading: supplierLoading } =
    useGetAcceptanceSupplierQuery(userName);
  // use get b2b
  const [getData, { data: b2bData, isLoading: b2bLoading }] =
    useLazyGetAcceptanceB2bQuery();
  // use get invoice
  const [getInvoice, { data: invoiceData, isLoading: invoiceLoading }] =
    useLazyGetInvoiceQuery();
  // use get master lc
  const [getMasterLc, { data: masterLcData }] = useLazyGetMasterLcByB2bQuery();
  // get payment term
  const { data: paymentTermData, isLoading: paymentLoading } =
    useGetComPaymentTermQuery();
  // use get invoice info
  const [getInvoiceInfo, { data: invoiceInfoData }] =
    useLazyGetAcceptanceInvoiceInfoQuery();
  // use get invoice info
  const [getPaymentChange, { data: paymentChangeData }] =
    useLazyGetAcceptancePaymentChangeQuery();

  useEffect(() => {
    if (supplier) {
      getData(supplier?.supplier_ID);
    }
  }, [supplier]);
  useEffect(() => {
    if (b2bLc) {
      getInvoice(b2bLc?.bblC_Code);
      getMasterLc(b2bLc?.bblC_Code);
    }
    if (b2bLc && invoiceNo) {
      getInvoiceInfo({
        b2b: b2bLc?.bblC_Code,
        invNo: invoiceNo?.imP_InvoiceNo,
      });
    }
  }, [b2bLc, invoiceNo]);
  useEffect(() => {
    if (paymentTerm && acceptedDate) {
      getPaymentChange({ id: paymentTerm?.payment_ID, date: acceptedDate });
    }
  }, [paymentTerm, acceptedDate]);
  //
  useEffect(() => {
    if (masterLcData) {
      dispatch(
        setAcceptance({
          key: "masterLc",
          value: masterLcData?.data[0],
        })
      );
    }
  }, [masterLcData]);
  useEffect(() => {
    if (invoiceInfoData) {
      dispatch(
        setAcceptance({
          key: "invoiceValue",
          value: invoiceInfoData?.singleData?.invoiceValue,
        })
      );
      dispatch(
        setAcceptance({
          key: "submissionDate",
          value: invoiceInfoData?.singleData?.submissionDate,
        })
      );
    }
  }, [invoiceInfoData]);
  useEffect(() => {
    if (paymentChangeData) {
      dispatch(
        setAcceptance({
          key: "maturityDate",
          value: paymentChangeData?.singleData?.maturityDate,
        })
      );
    }
  }, [paymentChangeData]);
  return (
    <>
      <CustomAppBar title={"input fields"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mb: 0.5 }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Supplier"}
              name="supplier"
              options={supplierData?.data ?? []}
              value={supplier}
              optionLabel={"cSupName"}
              optionId={"supplier_ID"}
              loading={supplierLoading}
              setReduxState={setAcceptance}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"B2B LC"}
              name="b2bLc"
              options={supplier ? b2bData?.data ?? [] : []}
              value={b2bLc}
              optionLabel={"b2BLC_No"}
              optionId={"bblC_Code"}
              loading={b2bLoading}
              setReduxState={setAcceptance}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Invoice No."}
              name="invoiceNo"
              options={b2bLc ? invoiceData?.data ?? [] : []}
              value={invoiceNo}
              optionLabel={"imP_InvoiceNo"}
              optionId={"imP_InvoiceNo"}
              loading={invoiceLoading}
              setReduxState={setAcceptance}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Invoice Value"}
              value={invoiceValue}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"Submission Date"}
              value={submissionDate}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"Accepted Date"}
              name="acceptedDate"
              value={acceptedDate}
              setReduxState={setAcceptance}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Payment Term"}
              name="paymentTerm"
              options={paymentTermData?.data ?? []}
              value={paymentTerm}
              optionLabel={"payment_Name"}
              optionId={"payment_ID"}
              loading={paymentLoading}
              setReduxState={setAcceptance}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Master LC "}
              // options={[]}
              value={masterLc}
              optionLabel={"masterLCNo"}
              optionId={"masterLCCode"}
              required={true}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label={"Maturity Date"}
              name="maturityDate"
              value={maturityDate}
              setReduxState={setAcceptance}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Mode of LC"}
              name="modeOfLC"
              value={modeOfLC}
              options={[
                { id: 1, text: "ABP" },
                { id: 2, text: "EDF" },
              ]}
              optionLabel={"text"}
              optionId={"id"}
              setReduxState={setAcceptance}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Ref."}
              name="ref"
              value={ref}
              setReduxState={setAcceptance}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Accepted Amount"}
              name="acceptedAmount"
              type="number"
              value={acceptedAmount}
              setReduxState={setAcceptance}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Exchange Rate"}
              name="exchangeRate"
              value={exchangeRate}
              setReduxState={setAcceptance}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <CustomTextInput
              label={"Remarks"}
              name="remarks"
              value={remarks}
              setReduxState={setAcceptance}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NewAcceptanceInput;

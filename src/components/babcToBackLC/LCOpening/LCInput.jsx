import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomAppBar from "../../common/CustomAppBar";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import {
  useGetSupplierQuery,
  useLazyGetLcIssuingBankQuery,
  useLazyGetMasterLcChangeDataQuery,
  useLazyGetMasterLcNoQuery,
} from "../../../redux/features/commercial/backToBackLC/queryBackToBackLC";
import { setBackToBack } from "../../../redux/features/commercial/backToBackLC/backToBackLcSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetComBankQuery,
  useGetComCurrencyQuery,
  useGetComPaymentTermQuery,
  useGetComStatusQuery,
  useLazyGetComBuyerQuery,
} from "../../../redux/features/commercial/contract/queryContract";
import OtherCharge from "./OtherCharge";
import { reSetExistingData, setExistingData } from ".";
import { useDebounce } from "../../../hooks/useDebounce";

const LCInput = () => {
  const dispatch = useDispatch();
  const {
    company,
    lcIssuingBank,
    backToBackLC,
    contract,
    buyer,
    beneficiary,
    receiveBank,
    openingDate,
    deliveryDate,
    docRecvDate,
    expiryDate,
    b2bLCValue,
    amendmentDate,
    paymentTerm,
    currency,
    lcStatus,
    exchangeRate,
    udAmendment,
    ud,
    itemDescription,
    remarks,
    contractValue,
    bblcLimit,
    bblcOpened,
    balance,
    //
    selectedRows,
    availablePIData,
    existingBackToBackFieldsData,
  } = useSelector((state) => state.backToBackLC);
  const [localB2B, setLocalB2B] = useState(backToBackLC);
  const b2bTxt = useDebounce(localB2B, 500);
  useEffect(() => {
    dispatch(setBackToBack({ key: "backToBackLC", value: b2bTxt }));
  }, [b2bTxt]);
  // get lc issuing bank

  const [
    getData,
    { data: lcIssuingBankData, isLoading: lcIssuingBankLoading },
  ] = useLazyGetLcIssuingBankQuery();
  // get master lc
  const [getLcData, { data: masterLcData, isLoading: masterLcLoading }] =
    useLazyGetMasterLcNoQuery();
  // get buyer
  const [getBuyer, { data: buyerData, isLoading: buyerLoading }] =
    useLazyGetComBuyerQuery();
  useEffect(() => {
    if (company) {
      getBuyer(company?.company_ID);
      getData(company?.company_ID);
      getLcData(company?.company_ID);
    }
  }, [company]);
  // get supplier
  const { data: supplierData, isLoading: supplierLoading } =
    useGetSupplierQuery();
  //get bank
  const { data: bankData, isLoading: bankLoading } = useGetComBankQuery();
  // get payment term
  const { data: paymentTermData, isLoading: paymentTermLoading } =
    useGetComPaymentTermQuery();
  // get currency
  const { data: currencyData, isLoading: currencyLoading } =
    useGetComCurrencyQuery();
  // get status
  const { data: statusData, isLoading: statusLoading } = useGetComStatusQuery();

  // get lc data
  const [getMasterLc, { data: lcData }] = useLazyGetMasterLcChangeDataQuery();
  useEffect(() => {
    if (contract) {
      getMasterLc(contract?.contract_Slno);
    }
  }, [contract]);

  useEffect(() => {
    if (!contract) {
      dispatch(
        setBackToBack({
          key: "buyer",
          value: null,
        })
      );
      dispatch(
        setBackToBack({
          key: "contractValue",
          value: "",
        })
      );
      dispatch(
        setBackToBack({
          key: "bblcLimit",
          value: "",
        })
      );
      dispatch(
        setBackToBack({
          key: "bblcOpened",
          value: "",
        })
      );
      dispatch(
        setBackToBack({
          key: "balance",
          value: "",
        })
      );
      dispatch(
        setBackToBack({
          key: "ud",
          value: "",
        })
      );
      return;
    }
    if (lcData?.data.length > 0) {
      const {
        buyerID,
        cBuyer_Name,
        calculateValue,
        b2BLc,
        udno,
        bblcLimit,
        totalB2bOpenVal,
        b2b_Balance,
      } = lcData?.data[0];

      dispatch(
        setBackToBack({
          key: "buyer",
          value: { buyer_ID: buyerID, buyer_Name: cBuyer_Name },
        })
      );
      dispatch(
        setBackToBack({
          key: "contractValue",
          value: calculateValue,
        })
      );
      dispatch(
        setBackToBack({
          key: "bblcLimit",
          value: bblcLimit,
        })
      );
      dispatch(
        setBackToBack({
          key: "bblcOpened",
          value: totalB2bOpenVal !== b2bLCValue ? b2bLCValue : totalB2bOpenVal,
        })
      );
      dispatch(
        setBackToBack({
          key: "balance",
          value: bblcLimit - bblcOpened,
        })
      );
      dispatch(
        setBackToBack({
          key: "ud",
          value: udno,
        })
      );
    }
  }, [lcData, contract, b2bLCValue, bblcOpened]);

  useEffect(() => {
    if (selectedRows.length > 0 && availablePIData.length > 0) {
      const total = selectedRows?.reduce(
        (accumulator, currentValue) => +currentValue.value + accumulator,
        0
      );
      dispatch(setBackToBack({ key: "b2bLCValue", value: total }));
    } else {
      dispatch(setBackToBack({ key: "b2bLCValue", value: "" }));
    }
  }, [selectedRows]);

  // if selected back to back have then this code for that data bind.
  useEffect(() => {
    if (existingBackToBackFieldsData?.length > 0) {
      setExistingData(dispatch, existingBackToBackFieldsData);
    } else {
      reSetExistingData(dispatch);
    }
  }, [existingBackToBackFieldsData]);
  return (
    <>
      <CustomAppBar title={"input fields"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mb: 0.5 }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              label={"LC issuing Bank"}
              name="lcIssuingBank"
              options={company ? lcIssuingBankData?.data ?? [] : []}
              value={lcIssuingBank}
              optionLabel={"bank_Name"}
              optionId={"bank_Code"}
              loading={lcIssuingBankLoading}
              setReduxState={setBackToBack}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Back To Back LC "}
              value={localB2B}
              setStateValue={setLocalB2B}
              // name="backToBackLC"
              // value={backToBackLC}
              // setReduxState={setBackToBack}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Contract"}
              name="contract"
              options={company ? masterLcData?.data ?? [] : []}
              value={contract}
              optionLabel={"cContractNo"}
              optionId={"contract_Slno"}
              loading={masterLcLoading}
              setReduxState={setBackToBack}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              label={"Buyer"}
              name="buyer"
              options={company ? buyerData?.data ?? [] : []}
              value={buyer}
              optionLabel={"buyer_Name"}
              optionId={"buyer_ID"}
              loading={buyerLoading}
              setReduxState={setBackToBack}
              required={true}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              label={"Beneficiary"}
              name="beneficiary"
              options={supplierData?.data ?? []}
              value={beneficiary}
              optionLabel={"cSupName"}
              optionId={"nCode"}
              loading={supplierLoading}
              setReduxState={setBackToBack}
              required={true}
              // disabled={isDisabled}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}  >
            <CustomTextInput
              label={"Beneficiary"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              label={"Receiving/Advising Bank "}
              name="receiveBank"
              options={bankData?.data ?? []}
              value={receiveBank}
              optionLabel={"bank_Name"}
              optionId={"bank_ID"}
              loading={bankLoading}
              setReduxState={setBackToBack}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomDatePicker
              label={"Opening Date"}
              name="openingDate"
              value={openingDate}
              setReduxState={setBackToBack}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomDatePicker
              label={"Delivery Date"}
              name="deliveryDate"
              value={deliveryDate}
              setReduxState={setBackToBack}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomDatePicker
              label={"Doc Recv Date"}
              name="docRecvDate"
              value={docRecvDate}
              setReduxState={setBackToBack}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomDatePicker
              label={"Expiry Date"}
              name="expiryDate"
              value={expiryDate}
              setReduxState={setBackToBack}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"B2B LC Value"}
              name="b2bLCValue"
              value={b2bLCValue}
              // setReduxState={setBackToBack}
              required
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomDatePicker
              label={"Amendment Date"}
              name="amendmentDate"
              value={amendmentDate}
              setReduxState={setBackToBack}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              label={"Payment Term"}
              name="paymentTerm"
              options={paymentTermData?.data ?? []}
              value={paymentTerm}
              optionLabel={"payment_Name"}
              optionId={"payment_ID"}
              loading={paymentTermLoading}
              setReduxState={setBackToBack}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <OtherCharge />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              label={"Currency Type"}
              name="currency"
              options={currencyData?.data ?? []}
              value={currency}
              optionLabel={"currency_Name"}
              optionId={"currency_Name"}
              loading={currencyLoading}
              setReduxState={setBackToBack}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              label={"LC Status"}
              name="lcStatus"
              options={statusData?.data ?? []}
              value={lcStatus}
              optionLabel={"status_name"}
              optionId={"status_name"}
              loading={statusLoading}
              setReduxState={setBackToBack}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Exchange Rate"}
              name="exchangeRate"
              type="number"
              value={exchangeRate}
              setReduxState={setBackToBack}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"UD Amendment"}
              name="udAmendment"
              value={udAmendment}
              setReduxState={setBackToBack}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"UD"}
              name="ud"
              value={ud}
              setReduxState={setBackToBack}
              required
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Item Description"}
              name="itemDescription"
              value={itemDescription}
              setReduxState={setBackToBack}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Remarks"}
              name="remarks"
              multiline
              value={remarks}
              setReduxState={setBackToBack}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Contract Value"}
              name="contractValue"
              value={contractValue}
              setReduxState={setBackToBack}
              required
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"BBLC limit"}
              name="bblcLimit"
              value={bblcLimit}
              setReduxState={setBackToBack}
              required
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"BBLC Opened"}
              name="bblcOpened"
              value={bblcOpened}
              setReduxState={setBackToBack}
              required
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Balance"}
              name="balance"
              value={balance}
              setReduxState={setBackToBack}
              required
              disabled
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LCInput;

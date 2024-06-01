import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomAppBar from "../../common/CustomAppBar";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import {
  resetContract,
  setContract,
  setTableData,
} from "../../../redux/features/commercial/contract/contractSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetComBankQuery,
  useGetComCurrencyQuery,
  useGetComNotifyQuery,
  useGetComPartialShipmentQuery,
  useGetComPaymentModeQuery,
  useGetComPaymentTermQuery,
  useGetComShipModeQuery,
  useGetComStatusQuery,
  useLazyGetComBuyerQuery,
  useLazyGetComContractDetailsQuery,
} from "../../../redux/features/commercial/contract/queryContract";
import { useDebounce } from "../../../hooks/useDebounce";

const ContractInput = () => {
  const dispatch = useDispatch();
  const {
    company,
    fileJob,
    contract,
    exportLC,
    buyer,
    issueBank,
    receiveBank,
    lienBank,
    notifyParty,
    bblcLimit,
    paymentMode,
    openingDate,
    amendmentDate,
    currency,
    partialShipment,
    paymentTerm,
    expiryDate,
    shipmentMode,
    insuranceValue,
    status,
    lastShipmentDate,
    freightValue,
    UDVersion,
    UD,
    UDIssueDate,
    quantity,
    contractValue,
    autoCalculate,
    other,
    totalCommission,
    percent,
    // ----->
    tableDataInRedux,
    amendment,
  } = useSelector((state) => state.contract);

  const [localCommission, setLocalCommission] = useState("0");
  const [localPercent, setLocalPercent] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  // debounce delay hook
  const debouncedSearchTerm = useDebounce(contract, 500);
  // get buyer
  const [getBuyer, { data: buyerData, isLoading: buyerLoading }] =
    useLazyGetComBuyerQuery();
  //get bank
  const { data: bankData, isLoading: bankLoading } = useGetComBankQuery();
  // get notify party
  const { data: notifyPartyData, isLoading: notifyPartyLoading } =
    useGetComNotifyQuery();
  // get payment mode
  const { data: paymentModeData, isLoading: paymentModeLoading } =
    useGetComPaymentModeQuery();
  // get currency
  const { data: currencyData, isLoading: currencyLoading } =
    useGetComCurrencyQuery();
  // get partial shipment
  const { data: partialShipmentData, isLoading: partialShipmentLoading } =
    useGetComPartialShipmentQuery();
  // get payment term
  const { data: paymentTermData, isLoading: paymentTermLoading } =
    useGetComPaymentTermQuery();
  //get shipment mode
  const { data: shipmentModeData, isLoading: shipmentModeLoading } =
    useGetComShipModeQuery();
  // get status
  const { data: statusData, isLoading: statusLoading } = useGetComStatusQuery();
  // get Contract Details
  const [
    getContractDetails,
    { data: contractDetailsData, error: contractDetailsError },
  ] = useLazyGetComContractDetailsQuery();

  useEffect(() => {
    getContractDetails({
      contract: debouncedSearchTerm,
      company: company?.company_ID,
    });
  }, [debouncedSearchTerm]);

  useEffect(() => {
    // contract && getContractDetails(contract);
    if (contractDetailsData) {
      dispatch(
        setContract({ key: "contractData", value: contractDetailsData?.data })
      );
      dispatch(setTableData(contractDetailsData?.data));
      dispatch(
        setContract({
          key: "contractFormData",
          value: contractDetailsData?.dataSingle[0],
        })
      );
      if (contractDetailsData?.dataSingle.length > 0) {
        setIsDisabled(true);
        // dispatch(
        //   setContract({
        //     key: "company",
        //     value: {
        //       company_ID: contractDetailsData?.dataSingle[0]?.companyID,
        //       company_Name: contractDetailsData?.dataSingle[0]?.cCmpName,
        //     },
        //   })
        // );
        dispatch(
          setContract({
            key: "amendmentValue",
            value: contractDetailsData?.dataSingle[0]?.amandmentNO,
          })
        );
        dispatch(
          setContract({
            key: "fileJob",
            value: contractDetailsData?.dataSingle[0]?.fileno,
          })
        );
        dispatch(
          setContract({
            key: "exportLC",
            value: contractDetailsData?.dataSingle[0]?.fileno,
          })
        );
        dispatch(
          setContract({
            key: "buyer",
            value: {
              buyer_ID: contractDetailsData?.dataSingle[0]?.buyerID,
              buyer_Name: contractDetailsData?.dataSingle[0]?.cBuyer_Name,
            },
          })
        );
        dispatch(
          setContract({
            key: "issueBank",
            value: {
              bank_ID: contractDetailsData?.dataSingle[0]?.nIssuingBank,
              bank_Name: contractDetailsData?.dataSingle[0]?.issuingBank_Name,
            },
          })
        );
        dispatch(
          setContract({
            key: "receiveBank",
            value: {
              bank_ID: contractDetailsData?.dataSingle[0]?.nReceivingBank,
              bank_Name: contractDetailsData?.dataSingle[0]?.receivingBank_Name,
            },
          })
        );
        dispatch(
          setContract({
            key: "lienBank",
            value: {
              bank_ID: contractDetailsData?.dataSingle[0]?.nNegotiableBank,
              bank_Name:
                contractDetailsData?.dataSingle[0]?.negotiableBank_Name,
            },
          })
        );
        dispatch(
          setContract({
            key: "notifyParty",
            value: {
              buyer_ID: contractDetailsData?.dataSingle[0]?.cNotifyParti,
              buyer_Name: contractDetailsData?.dataSingle[0]?.notifyParti_Name,
            },
          })
        );

        dispatch(
          setContract({
            key: "bblcLimit",
            value: contractDetailsData?.dataSingle[0]?.b2BLc,
          })
        );

        dispatch(
          setContract({
            key: "paymentMode",
            value: {
              paymentMode_ID: contractDetailsData?.dataSingle[0]?.payment_Mode,
              paymentMode_Name:
                contractDetailsData?.dataSingle[0]?.paymentMode_Name,
            },
          })
        );

        dispatch(
          setContract({
            key: "openingDate",
            value: contractDetailsData?.dataSingle[0]?.dOpeningDate,
          })
        );

        dispatch(
          setContract({
            key: "currency",
            value: {
              currency_Name: contractDetailsData?.dataSingle[0]?.nCurrencyType,
            },
          })
        );
        dispatch(
          setContract({
            key: "partialShipment",
            value: {
              partial_Name:
                contractDetailsData?.dataSingle[0]?.dPartialshipment,
            },
          })
        );
        dispatch(
          setContract({
            key: "paymentTerm",
            value: {
              payment_ID: contractDetailsData?.dataSingle[0]?.cPaymentTerm,
              payment_Name:
                contractDetailsData?.dataSingle[0]?.paymentTerm_Name,
            },
          })
        );
        dispatch(
          setContract({
            key: "shipmentMode",
            value: {
              shipMode_Name: contractDetailsData?.dataSingle[0]?.cShipMode,
            },
          })
        );
        dispatch(
          setContract({
            key: "status",
            value: {
              status_name: contractDetailsData?.dataSingle[0]?.status,
            },
          })
        );

        dispatch(
          setContract({
            key: "amendmentDate",
            value: contractDetailsData?.dataSingle[0]?.dAmendmentDate,
          })
        );
        dispatch(
          setContract({
            key: "expiryDate",
            value: contractDetailsData?.dataSingle[0]?.dExpireDate,
          })
        );
        dispatch(
          setContract({
            key: "insuranceValue",
            value: contractDetailsData?.dataSingle[0]?.nInsuranceValue,
          })
        );
        dispatch(
          setContract({
            key: "lastShipmentDate",
            value: contractDetailsData?.dataSingle[0]?.dLastShipDate,
          })
        );
        dispatch(
          setContract({
            key: "freightValue",
            value: contractDetailsData?.dataSingle[0]?.nFrightValue,
          })
        );
        dispatch(
          setContract({
            key: "UDVersion",
            value: contractDetailsData?.dataSingle[0]?.cUDVersion,
          })
        );
        dispatch(
          setContract({
            key: "UD",
            value: contractDetailsData?.dataSingle[0]?.udno,
          })
        );
        dispatch(
          setContract({
            key: "UDIssueDate",
            value: contractDetailsData?.dataSingle[0]?.udIssuingDate,
          })
        );
        dispatch(
          setContract({
            key: "other",
            value: contractDetailsData?.dataSingle[0]?.otherCharges,
          })
        );
        dispatch(
          setContract({
            key: "totalCommission",
            value: contractDetailsData?.dataSingle[0]?.totalCommission,
          })
        );
        dispatch(
          setContract({
            key: "percent",
            value: contractDetailsData?.dataSingle[0]?.prcnt,
          })
        );
        setLocalPercent(contractDetailsData?.dataSingle[0]?.prcnt);
      }
    } else {
      setIsDisabled(false);
      dispatch(resetContract());
    }
  }, [contractDetailsData, contractDetailsError]);
  useEffect(() => {
    if (contractDetailsError) {
      // errorToast("something went wrong");
      setIsDisabled(false);
      dispatch(setContract({ key: "contractData", value: null }));
      dispatch(resetContract());
    }
  }, [contractDetailsError]);

  //
  useEffect(() => {
    company && getBuyer(company?.company_ID);
  }, [company]);

  const selectedStyleTableData = tableDataInRedux?.filter((row) => row.lcuse);

  useEffect(() => {
    const totalQty = selectedStyleTableData?.reduce((sum, item) => {
      return sum + item.nOrdQty;
    }, 0);
    dispatch(setContract({ key: "quantity", value: totalQty }));
  }, [selectedStyleTableData]);

  // total value of selected style table
  const totalValue = selectedStyleTableData?.reduce((sum, item) => {
    const calculatedValue = item.nfob * item.nOrdQty;
    return sum + calculatedValue;
  }, 0);

  // calculate percent
  useEffect(() => {
    if (selectedStyleTableData.length > 0) {
      //
      // console.log(totalValue);
      dispatch(
        setContract({ key: "contractValue", value: totalValue?.toFixed(2) })
      );
      dispatch(
        setContract({
          key: "autoCalculate",
          value: (+totalValue - (+totalValue * +percent) / 100)?.toFixed(2),
        })
      );

      //
    } else {
      dispatch(
        setContract({
          key: "autoCalculate",
          value: "",
        })
      );
      dispatch(
        setContract({
          key: "contractValue",
          value: "",
        })
      );
    }
  }, [selectedStyleTableData]);

  // total commission
  useEffect(() => {
    if (totalValue === 0) {
      dispatch(
        setContract({
          key: "percent",
          value: "",
        })
      );
      dispatch(
        setContract({
          key: "totalCommission",
          value: "",
        })
      );
    } else if (totalCommission && localCommission) {
      dispatch(
        setContract({
          key: "percent",
          value: ((+totalCommission * 100) / +totalValue)?.toFixed(2),
        })
      );
    }
    if (!localCommission && !totalCommission) {
      dispatch(
        setContract({
          key: "percent",
          value: "",
        })
      );
    }
  }, [localCommission, totalValue]);

  // percentage
  useEffect(() => {
    if (totalValue === 0) {
      dispatch(
        setContract({
          key: "percent",
          value: "",
        })
      );
      dispatch(
        setContract({
          key: "totalCommission",
          value: "",
        })
      );
    } else if (percent && localPercent) {
      dispatch(
        setContract({
          key: "totalCommission",
          value: ((+totalValue * +percent) / 100)?.toFixed(2),
        })
      );
      dispatch(
        setContract({
          key: "percent",
          value: localPercent,
        })
      );
    }
    if (!percent && !localPercent) {
      dispatch(
        setContract({
          key: "totalCommission",
          value: "",
        })
      );
    }
  }, [localPercent, totalValue]);
  return (
    <>
      <CustomAppBar title={"input fields"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mb: 0.5 }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"File / Job"}
              name="fileJob"
              value={fileJob}
              setReduxState={setContract}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Contract"}
              name="contract"
              value={contract}
              setReduxState={setContract}
              // onBlur={(e) => handleBlur(e.target.value)}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Export LC"}
              name="exportLC"
              value={exportLC}
              setReduxState={setContract}
              // disabled={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              label={"Buyer"}
              name="buyer"
              options={company ? buyerData?.data ?? [] : []}
              value={buyer}
              optionLabel={"buyer_Name"}
              optionId={"buyer_ID"}
              loading={buyerLoading}
              setReduxState={setContract}
              required={true}
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              label={"Issuing Bank"}
              name="issueBank"
              options={bankData?.data ?? []}
              value={issueBank}
              optionLabel={"bank_Name"}
              optionId={"bank_ID"}
              loading={bankLoading}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              label={"Receiving Bank"}
              name="receiveBank"
              options={bankData?.data ?? []}
              value={receiveBank}
              optionLabel={"bank_Name"}
              optionId={"bank_ID"}
              loading={bankLoading}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Lien Bank"}
              name="lienBank"
              options={bankData?.data ?? []}
              value={lienBank}
              optionLabel={"bank_Name"}
              optionId={"bank_ID"}
              loading={bankLoading}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              label={"Notify Party"}
              name="notifyParty"
              options={notifyPartyData?.data ?? []}
              value={notifyParty}
              optionLabel={"buyer_Name"}
              optionId={"buyer_ID"}
              loading={notifyPartyLoading}
              setReduxState={setContract}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"BBLC Limit (%)"}
              name="bblcLimit"
              type="number"
              value={bblcLimit}
              setReduxState={setContract}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              label={"Payment Mode"}
              name="paymentMode"
              options={paymentModeData?.data ?? []}
              value={paymentMode}
              optionLabel={"paymentMode_Name"}
              optionId={"paymentMode_ID"}
              loading={paymentModeLoading}
              setReduxState={setContract}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker
              label={"Opening Date"}
              name="openingDate"
              value={openingDate}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker
              label={"Amendment Date"}
              name="amendmentDate"
              value={amendmentDate}
              setReduxState={setContract}
              required={amendment}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              label={"Currency"}
              name="currency"
              options={currencyData?.data ?? []}
              value={currency}
              optionLabel={"currency_Name"}
              optionId={"currency_Name"}
              loading={currencyLoading}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              label={"Partial Shipment"}
              name="partialShipment"
              options={partialShipmentData?.data ?? []}
              value={partialShipment}
              optionLabel={"partial_Name"}
              optionId={"partial_Name"}
              loading={partialShipmentLoading}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              label={"Payment Term"}
              name="paymentTerm"
              options={paymentTermData?.data ?? []}
              value={paymentTerm}
              optionLabel={"payment_Name"}
              optionId={"payment_ID"}
              loading={paymentTermLoading}
              setReduxState={setContract}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker
              label={"Expiry Date"}
              name="expiryDate"
              value={expiryDate}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              label={"Shipment Mode"}
              name="shipmentMode"
              options={shipmentModeData?.data ?? []}
              value={shipmentMode}
              optionLabel={"shipMode_Name"}
              optionId={"shipMode_Name"}
              loading={shipmentModeLoading}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Insurance Value"}
              name="insuranceValue"
              type="number"
              value={insuranceValue}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              label={"Status"}
              name="status"
              options={statusData?.data ?? []}
              value={status}
              optionLabel={"status_name"}
              optionId={"status_name"}
              loading={statusLoading}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker
              label={"Last Shipment Date"}
              name="lastShipmentDate"
              value={lastShipmentDate}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Freight Value"}
              name="freightValue"
              type="number"
              value={freightValue}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"UD Version"}
              name="UDVersion"
              value={UDVersion}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"UD"}
              name="UD"
              value={UD}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker
              label={"UD Issuing Date"}
              name="UDIssueDate"
              value={UDIssueDate}
              setReduxState={setContract}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Quantity (Pcs)"}
              name="quantity"
              value={quantity}
              // setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Contract Value"}
              name="contractValue"
              value={contractValue}
              // setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Auto Calculated Value"}
              name="autoCalculate"
              value={autoCalculate}
              // setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Other"}
              name="other"
              type="number"
              value={other}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Total Commission"}
              name="totalCommission"
              type="number"
              value={totalCommission}
              onBlur={(e) => setLocalCommission(e.target.value)}
              // setStateValue={setLocalCommission}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"percent (%)"}
              name="percent"
              type="number"
              value={percent}
              onBlur={(e) => setLocalPercent(e.target.value)}
              // setStateValue={setLocalPercent}
              setReduxState={setContract}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContractInput;

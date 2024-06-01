import React, { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, Grid, Stack } from "@mui/material";
import ContractInput from "./ContractInput";
import SelectedStyle from "./SelectedStyle";
import AddMasterItem from "./AddMasterItem";
import AvailableStyle from "./AvailableStyle";
import AddButton from "../../buttons/AddButton";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  useCancelContractMutation,
  useSaveContractMutation,
} from "../../../redux/features/commercial/contract/mutationContract";
import {
  resetAll,
  setContract,
} from "../../../redux/features/commercial/contract/contractSlice";
import { errorToast, successToast } from "../../../common/toaster/toaster";
import CustomModal from "../../common/CustomModal";
import AddBank from "./masterItem/AddBank";
import AddCurrency from "./masterItem/AddCurrency";
import PaymentMode from "./masterItem/PaymentMode";
import PaymentTerm from "./masterItem/PaymentTerm";
import ErrorButton from "../../buttons/ErrorButton";

const ContractOpening = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { userName } = useSelector((state) => state.auth.user);
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
    amendmentValue,
    saveCount,
    contractFormData,
    contractData,
  } = useSelector((state) => state.contract);
  // save the contract
  const [saveContract, { data, error, isLoading, isSuccess }] =
    useSaveContractMutation();

  // cancel contract
  const [
    cancelContract,
    {
      data: cancelData,
      isSuccess: cancelSuccess,
      error: cancelError,
      isLoading: cancelLoading,
    },
  ] = useCancelContractMutation();
  // handleAdd fn
  const handleAdd = (e) => {
    e.preventDefault();
    const payload = {
      buyerID: buyer?.buyer_ID,
      seasonID: 1,
      companyID: company?.company_ID,
      cContractNo: contract,
      nIssuingBank: issueBank?.bank_ID,
      nReceivingBank: receiveBank?.bank_ID,
      nNegotiableBank: lienBank?.bank_ID,
      b2BLc: +bblcLimit,
      cPaymentTerm: paymentTerm?.payment_ID,
      cShipMode: shipmentMode?.shipMode_Name,
      dOpeningDate: dayjs(openingDate).format("MM-DD-YYYY"),
      dAmendmentDate: amendmentDate
        ? dayjs(amendmentDate).format("MM-DD-YYYY")
        : "",
      dLastShipDate: dayjs(lastShipmentDate).format("MM-DD-YYYY"),
      dExpireDate: dayjs(expiryDate).format("MM-DD-YYYY"),
      nCurrencyType: currency?.currency_Name,
      cUDVersion: UDVersion,
      nFrightValue: +freightValue,
      cNotifyParti: notifyParty?.buyer_ID,
      udno: UD,
      nInsuranceValue: +insuranceValue,
      dPartialshipment: partialShipment?.partial_Name,
      created_User: userName,
      totalPOQty: +quantity,
      contractValue: +contractValue,
      totalCommission: +totalCommission,
      calculateValue: +autoCalculate,
      status: status?.status_name,
      amandmentNO: amendmentValue,
      payment_Mode: paymentMode?.paymentMode_ID,
      salescontno: exportLC,
      prcnt: +percent,
      fileno: fileJob,
      otherCharges: +other,
      udIssueDate: UDIssueDate ? dayjs(UDIssueDate).format("MM-DD-YYYY") : "",
      contractStyles: tableDataInRedux?.map((e) => ({
        styleID: e.nStyleID,
        lot: e.cOrderNu,
        checkBx: e.lcuse,
      })),
    };

    // console.log("payload", payload);
    saveContract(payload);
  };
  // handle cancel
  const handleCancel = () => {
    if (contract) {
      cancelContract({ contract: contract, user: userName });
    }
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      // setAmendmentCount((prev) => prev + 1);
      dispatch(setContract({ key: "amendment", value: true }));
      dispatch(
        setContract({ key: "amendmentValue", value: amendmentValue + 1 })
      );
    } else {
      // setAmendmentCount((prev) => prev - 1);
      dispatch(setContract({ key: "amendment", value: false }));
      dispatch(
        setContract({ key: "amendmentValue", value: amendmentValue - 1 })
      );
    }
  };
  // toaster
  useEffect(() => {
    if (data && isSuccess) {
      successToast("Saved Successfully");
      dispatch(setContract({ key: "saveCount", value: saveCount + 1 }));
    } else if (error) {
      errorToast("Something went wrong");
    }
  }, [data, error]);
  useEffect(() => {
    if (cancelData && cancelSuccess) {
      successToast(cancelData.message);
      dispatch(resetAll());
    }
  }, [cancelData]);
  useEffect(() => {
    if (cancelError) {
      errorToast(cancelError?.data?.data);
    }
  }, [cancelError]);

  // modal rendering
  let modal = null;

  if (title === "add-bank") {
    modal = <AddBank />;
  } else if (title === "add-currency") {
    modal = <AddCurrency />;
  } else if (title === "payment-mode") {
    modal = <PaymentMode />;
  } else if (title === "payment-term") {
    modal = <PaymentTerm />;
  } else null;

  return (
    <>
      <form onSubmit={handleAdd}>
        <Grid container spacing={0.5}>
          <Grid item md={12} lg={6}>
            <ContractInput />
            <AddMasterItem setOpen={setOpen} setTitle={setTitle} />
          </Grid>
          <Grid item md={12} lg={6}>
            {/* <ContractFilter /> */}
            <AvailableStyle />
            <SelectedStyle />

            <Box sx={{ my: 0, border: "1px dashed grey", mr: "1px" }}>
              <Stack
                direction={"row"}
                pl={1}
                spacing={1}
                justifyContent="space-between"
              >
                <span>
                  <FormControlLabel
                    control={
                      <Checkbox onClick={handleCheck} title="Amendment" />
                    }
                    label={`Amendment: ${amendmentValue}`}
                  />
                </span>
                <span style={{ margin: "auto 0" }}>
                  <ErrorButton
                    title={"Cancel"}
                    handleClick={handleCancel}
                    loading={cancelLoading}
                    disabled={!contractData && !contractFormData}
                  />
                  <AddButton
                    title={"Add"}
                    type="submit"
                    // handleClick={}
                    loading={isLoading}
                  />
                </span>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </form>
      <CustomModal open={open} setOpen={setOpen} title={title}>
        {modal}
        {/* {title === "add-currency" ? <AddCurrency /> : <AddBank />} */}
      </CustomModal>
    </>
  );
};

export default ContractOpening;

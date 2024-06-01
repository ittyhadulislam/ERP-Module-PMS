import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import LCInput from "./LCInput";
import AddMasterLCItem from "./AddMasterLCItem";
import AvailablePI from "./AvailablePI";
import { Box, Stack } from "@mui/system";
import ErrorButton from "../../buttons/ErrorButton";
import AddButton from "../../buttons/AddButton";
import SubmitButton from "../../buttons/SubmitButton";
import {
  useCancelMutation,
  useSaveB2BLCMutation,
} from "../../../redux/features/commercial/backToBackLC/mutationBackToBackLC";
import { useDispatch, useSelector } from "react-redux";
import { setBackToBack } from "../../../redux/features/commercial/backToBackLC/backToBackLcSlice";
import { errorToast, successToast } from "../../../common/toaster/toaster";
import { useLazyGetB2BSelectedQuery } from "../../../redux/features/commercial/backToBackLC/queryBackToBackLC";
import AddBank from "../../contract/contractOpening/masterItem/AddBank";
import CustomModal from "../../common/CustomModal";

const LCOpening = () => {
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
    otherCharge,
    amendmentValue,
    selectedRows,
    availablePIData,
    existingAvailablePIData,
  } = useSelector((state) => state.backToBackLC);
  const { userName } = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const prepareTable = availablePIData
    ?.filter(
      (item) => !selectedRows?.some((element) => element.pO_No === item.pO_No)
    )
    .map((e) => ({
      b2BLC_No: backToBackLC,
      pI_No: e?.pI_No,
      supplier_ID: e?.supplier_ID,
      pI_date: e?.pI_date,
      pI_value: e?.value,
      bBLC_Amandment: +amendmentValue,
      chk: false,
    }));

  // get selected back to back
  const [getData, { data }] = useLazyGetB2BSelectedQuery();

  useEffect(() => {
    if (company && backToBackLC) {
      getData({
        bblcno: backToBackLC,
        compid: company?.company_ID,
      });
    }
  }, [backToBackLC, company]);

  // save back to back data
  const [
    saveB2BLC,
    {
      data: saveData,
      isLoading: saveLoading,
      isSuccess: saveSuccess,
      error: saveError,
      isError: saveIsError,
    },
  ] = useSaveB2BLCMutation();
  // cancel api
  const [
    cancel,
    {
      data: cancelData,
      isSuccess: cancelSuccess,
      error: cancelError,
      isError: cancelIsError,
      isLoading: cancelLoading,
    },
  ] = useCancelMutation();

  // handle submit fn
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      lCType: "",
      appNo: "",
      buyerID: buyer?.buyer_ID,
      compId: company?.company_ID,
      lc_NO_Status: "",
      masterLCCode: contract?.contract_Slno,
      masterLCNo: contract?.cContractNo,
      b2BLCNo: backToBackLC,
      opening_Date: openingDate,
      lastShipment_Date: deliveryDate,
      amendment_Date: amendmentDate,
      expire_Date: expiryDate,
      benificiery: beneficiary?.nCode,
      doc_Receive_Date: docRecvDate,
      currency: currency?.currency_Name,
      b2BLC_Value: +b2bLCValue,
      issuing_Bank: lcIssuingBank?.bank_Code,
      receiving_Bank: receiveBank?.bank_ID,
      maximum: 0,
      bank_Charge: otherCharge,
      status: lcStatus?.status_name,
      userName: userName,
      remarks: remarks,
      bBLC_Amandment: +amendmentValue,
      exRate: +exchangeRate,
      payTerm: paymentTerm?.payment_ID,
      aDMVal: 0,
      uDAmendment: udAmendment,
      item: itemDescription,
      lC_Value: +contractValue,
      bBLC_Limit: +bblcLimit,
      bBLC_Opened: +bblcOpened,
      balance: +balance,
      piInfo: selectedRows
        ?.map((e) => ({
          b2BLC_No: backToBackLC,
          pI_No: e?.pI_No,
          supplier_ID: e?.supplier_ID,
          pI_date: e?.pI_date,
          pI_value: e?.value,
          bBLC_Amandment: +amendmentValue,
          chk: true,
        }))
        .concat(prepareTable),
    };

    console.log("payload", payload);
    saveB2BLC(payload);
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      // setAmendmentCount((prev) => prev + 1);
      dispatch(setBackToBack({ key: "amendment", value: true }));
      dispatch(
        setBackToBack({ key: "amendmentValue", value: amendmentValue + 1 })
      );
    } else {
      // setAmendmentCount((prev) => prev - 1);
      dispatch(setBackToBack({ key: "amendment", value: false }));
      dispatch(
        setBackToBack({ key: "amendmentValue", value: amendmentValue - 1 })
      );
    }
  };

  // handleCancel fn
  const handleCancel = () => {
    cancel({ bblc: backToBackLC, user: userName });
  };

  // toaster
  useEffect(() => {
    if (saveData && saveSuccess) {
      successToast(saveData?.message);
    }
  }, [saveData]);
  useEffect(() => {
    if (saveError && saveIsError) {
      errorToast(saveError?.data?.message);
    }
  }, [saveError]);
  //
  useEffect(() => {
    if (cancelData && cancelSuccess) {
      successToast(cancelData?.message);
    }
  }, [cancelData]);
  useEffect(() => {
    if (cancelError && cancelIsError) {
      errorToast(cancelError?.data?.message);
    }
  }, [cancelError]);

  // modal rendering
  let modal = null;
  if (title === "add-bank") {
    modal = <AddBank />;
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={0.5}>
          <Grid item md={12} lg={6}>
            <LCInput />
            <AddMasterLCItem setOpen={setOpen} setTitle={setTitle} />
          </Grid>
          <Grid item md={12} lg={6}>
            <AvailablePI />
            <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
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
                    disabled={
                      backToBackLC.length == 0 ||
                      existingAvailablePIData.length == 0
                    }
                  />
                  <SubmitButton
                    title={"Save"}
                    type="submit"
                    disabled={selectedRows?.length === 0}
                    // handleClick={}
                    loading={saveLoading}
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

export default LCOpening;

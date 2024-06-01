import { Box } from "@mui/system";
import React, { useEffect } from "react";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import InvoiceInput from "./InvoiceInput";
import { Grid } from "@mui/material";
import PIInformation from "./PIInformation";
import AddInput from "./AddInput";
import AddButton from "./AddButton";
import { useDispatch, useSelector } from "react-redux";
import { useSaveImportForeignAllMutation } from "../../../redux/features/commercial/importInvoiceForeign/mutationForeign";
import { errorToast, successToast } from "../../../common/toaster/toaster";
import { resetForeignInvoiceAll } from "../../../redux/features/commercial/importInvoiceForeign/foreignSlice";

const AddingImportInvoice = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth.user);
  const {
    supplier,
    submissionDate,
    lcDetails,
    invoice,
    date,
    invoiceValue,
    unit,
    invoiceQty,
    b2bLc,
    agent,
    docsDate,
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
  } = useSelector((state) => state.foreignInvoice);

  // save import foreign
  const [
    saveImportForeignAll,
    { data: saveData, error: saveError, isLoading: saveLoading },
  ] = useSaveImportForeignAllMutation();
  // handleSubmit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      invType: "",
      submissionDate: submissionDate,
      supplier_ID: supplier?.benificiery,
      bblc_Code: b2bLc?.b2BLC_Slno,
      b2blc_No: b2bLc?.b2BLCNo,
      lcValue: lcDetails?.lcValue,
      balance: lcDetails?.balance,
      imp_InvoiceNo: invoice,
      imp_InvoiceDate: date,
      invoice_Value: invoiceValue,
      shipMode: shipmentMode?.shipMode_Name,
      blawbno: awbNo,
      blDate: blDate,
      containerNo: containerNo,
      carierNo: carrierName,
      agent: agent,
      mVessel_Name: MVesselName,
      mVessel_ETD: MVesselETD,
      fVessel_Name: FVesselName,
      fVessel_ETD: FVesselETD,
      nnDocs_Date: docsDate,
      original_Date: originalDate,
      originalCNF: originalToCF,
      goods_Inhouse: goodsInHouse,
      billOfEntry: billOfEntry,
      userName: userName,
      fVessel_Eta: FVesselETA,
      billofEno: billOfEntryNo,
      passBookPage: passBookPageNo,
      imp_Qty: +invoiceQty,
      unit: unit?.nUnitID,
      landingPort: landingPort,
    };

    console.log(payload);
    saveImportForeignAll(payload);
  };

  useEffect(() => {
    if (saveData) {
      successToast(saveData?.message);
      dispatch(resetForeignInvoiceAll());
    }
  }, [saveData]);
  useEffect(() => {
    if (saveError) {
      errorToast(saveError?.data?.message);
    }
  }, [saveError]);

  return (
    <>
      <Box sx={{ my: 1 }}>
        <CustomAutocomplete
          label={"Supplier"}
          name="supplier"
          options={[]}
          value={supplier}
          optionLabel={"cSupName"}
          optionId={"benificiery"}
          required={true}
          disabled
        />
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={0.5} mb={0.5}>
          <Grid item md={12} lg={6}>
            <InvoiceInput />
          </Grid>
          <Grid item md={12} lg={6}>
            <PIInformation />
          </Grid>
        </Grid>
        <AddInput />
        <AddButton />
      </form>
    </>
  );
};

export default AddingImportInvoice;

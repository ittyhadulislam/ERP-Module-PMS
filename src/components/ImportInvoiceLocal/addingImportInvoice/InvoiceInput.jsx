import React from "react";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomAppBar from "../../common/CustomAppBar";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import { useSelector } from "react-redux";
import { setLocalInvoice } from "../../../redux/features/commercial/importInvoiceLocal/localSlice";

const InvoiceInput = () => {
  const { b2bLc, submissionDate, invoice, date, lcDetails } = useSelector(
    (state) => state.localInvoice
  );

  return (
    <>
      <CustomAppBar title={"input fields"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mb: 0.5 }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomDatePicker
              label={"Submission Date"}
              name="submissionDate"
              value={submissionDate}
              setReduxState={setLocalInvoice}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              label={"B2B LC"}
              name="b2bLc"
              options={[]}
              value={b2bLc}
              optionLabel={"b2BLCNo"}
              optionId={"b2BLC_Slno"}
              required={true}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"LC Value"}
              value={lcDetails?.lcValue}
              disabled={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Balance"}
              value={lcDetails?.balance}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Invoice No"}
              value={invoice}
              disabled={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomDatePicker label={"Invoice  Date"} value={date} disabled />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InvoiceInput;

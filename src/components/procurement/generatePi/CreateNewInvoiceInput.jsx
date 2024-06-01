import { Box, Grid } from "@mui/material";
import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTextInputSmall from "../../merchandisingUI/CustomTextInputSmall";
import CustomAutocompleteSmall from "../../merchandisingUI/CustomAutocompleteSmall";
import CustomDatePickerSmall from "../../merchandisingUI/CustomDatePickerSmall";

const CreateNewInvoiceInput = () => {
  return (
    <>
      <CustomAppBar title={"input parameter"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"-5px"}>
          <Grid item xs={12} sm={6}>
            <CustomTextInputSmall label={"PI No"} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocompleteSmall label={"Supplier"} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomDatePickerSmall label={"PI Date"} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomDatePickerSmall label={"Shipment Date"} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomTextInputSmall label={"Total Value"} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CreateNewInvoiceInput;

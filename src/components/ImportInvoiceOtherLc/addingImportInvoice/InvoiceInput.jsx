import React from "react";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomAppBar from "../../common/CustomAppBar";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";

const InvoiceInput = () => {
  return (
    <>
      <CustomAppBar title={"input fields"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mb: 0.5 }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomDatePicker label={"Submission Date"} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Other LC NO"}
              options={[]}
              //   value={selectedStyle}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isLoading}
              //   setSelectedValue={setSelectedStyle}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"LC Value"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Balance"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Invoice No"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomDatePicker label={"Invoice  Date"} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InvoiceInput;

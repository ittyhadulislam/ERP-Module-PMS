import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import AddButton from "./AddButton";

const NewAcceptanceInput = () => {
  return (
    <>
      <CustomAppBar title={"input fields"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mb: 0.5 }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Supplier"}
              options={[]}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Other LC"}
              options={[]}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Invoice No."}
              options={[]}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Invoice Value"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker label={"Submission Date"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker label={"Accepted Date"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Payment Mode"}
              options={[]}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker label={"Maturity Date"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Mode of LC"}
              options={[]}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Ref."}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Accepted Amount"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Exchange Rate"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextInput
              label={"Remarks"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
        </Grid>
      </Box>
      <AddButton />
    </>
  );
};

export default NewAcceptanceInput;

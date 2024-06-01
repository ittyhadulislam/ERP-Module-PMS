import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";

const AddInput = () => {
  return (
    <>
      <CustomAppBar title={"input fields"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mb: 0.5 }}>
        <Grid container spacing={1} mt={"5px"}>
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
            <CustomTextInput
              label={"Agent"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Invoice Qty"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Unit"}
              options={[]}
              //   value={selectedStyle}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isLoading}
              //   setSelectedValue={setSelectedStyle}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker label={"N.N Docs Date"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"M.Vessel Name"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker label={"Original Date"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Ship Mode"}
              options={[]}
              //   value={selectedStyle}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isLoading}
              //   setSelectedValue={setSelectedStyle}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <CustomDatePicker label={"M.Vessel ETD"} />
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <CustomDatePicker label={"Original To C&F"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"BL/AWB No"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"F.Vessel Name"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker label={"Goods Inhouse"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker label={"BL Date"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker label={"F.Vessel ETD"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker label={"Bill of Entry"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Container No"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Carier Name"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Landing Port"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <CustomTextInput
              label={"Bill of Entry No."}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <CustomTextInput
              label={"Pass Book Page No."}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker label={"F.Vessel ETA"} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddInput;

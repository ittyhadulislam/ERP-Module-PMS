import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomDatePicker from "../../inputs/CustomDatePicker";

const LCInput = () => {
  return (
    <>
      <CustomAppBar title={"input fields"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mb: 0.5 }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"LC issuing Bank"}
              options={[]}
              //   value={selectedStyle}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isLoading}
              //   setSelectedValue={setSelectedStyle}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"LC"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Beneficiary"}
              options={[]}
              //   value={selectedStyle}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isLoading}
              //   setSelectedValue={setSelectedStyle}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Receiving Bank"}
              options={[]}
              //   value={selectedStyle}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isLoading}
              //   setSelectedValue={setSelectedStyle}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker label={"Opening Date"} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker label={"Delivery Date"} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker label={"Doc Recv Date"} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker label={"Expiry Date"} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"LC Value"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker label={"Amendment Date"} />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Payment Term"}
              options={[]}
              //   value={selectedStyle}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isLoading}
              //   setSelectedValue={setSelectedStyle}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {/* <CustomAutocomplete
              //   setValue={setValue}
              label={"Partial Shipment"}
              options={[]}
              //   value={selectedStyle}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isLoading}
              //   setSelectedValue={setSelectedStyle}
              required={true}
            /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Currency Type"}
              options={[]}
              //   value={selectedStyle}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isLoading}
              //   setSelectedValue={setSelectedStyle}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Exchange Rate"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"LC Status"}
              options={[]}
              //   value={selectedStyle}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isLoading}
              //   setSelectedValue={setSelectedStyle}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Item Description"}
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
    </>
  );
};

export default LCInput;

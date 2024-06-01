import React from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import CustomTextInput from "../inputs/CustomTextInput";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomDatePicker from "../inputs/CustomDatePicker";

const RealizationInput = () => {
  return (
    <>
      <CustomAppBar title={"input fields"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mb: 0.5 }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Bank Bill"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />{" "}
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker label={"Bank Bill Date"} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Bank Bill Value"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomDatePicker label={"Date"} />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomTextInput
              label={"Value"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
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
          <Grid item xs={12} sm={6}>
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

export default RealizationInput;

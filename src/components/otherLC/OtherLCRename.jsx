import React from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomTextInput from "../inputs/CustomTextInput";
import SubmitButton from "../buttons/SubmitButton";

const OtherLCRename = () => {
  return (
    <>
      <CustomAppBar title={"Rename contract"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Back To Back LC"}
              options={[]}
              //   value={selectedStyle}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isLoading}
              //   setSelectedValue={setSelectedStyle}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Rename Other LC To"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <SubmitButton title={"Rename"} fullWidth />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OtherLCRename;

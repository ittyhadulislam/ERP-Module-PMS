import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTextInput from "../../inputs/CustomTextInput";

const ContractFilter = () => {
  return (
    <>
      <CustomAppBar title={"filter parameter"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Contract"}
              value={""}
              name="buyer"
              // register={register}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Style"}
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

export default ContractFilter;

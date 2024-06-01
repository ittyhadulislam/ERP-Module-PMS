import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box, Button, Stack } from "@mui/material";
import { Grid } from "@mui/material";
import CustomTextInput from "../../inputs/CustomTextInput";
import SubmitButton from "../../buttons/SubmitButton";
import ReportButton from "../../buttons/ReportButton";

const PI = () => {
  return (
    <>
      <Box mt={0.5}></Box>
      <CustomAppBar title={"PI"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mb: 0.5 }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextInput
              label={"Adjustments"}
              value={""}
              name="buyer"
              // register={register}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.66}>
            <SubmitButton title={"save"} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={2.66}>
            <ReportButton title={"Print invoice"} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={2.66}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              //   onClick={() => setSubCatOpen(true)}
              sx={{
                paddingY: "0.42em",
                margin: "2px",
              }}
              //   disabled={showSubCat}
            >
              More Details
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PI;

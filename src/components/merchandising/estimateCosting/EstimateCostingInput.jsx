import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import CustomAutocompleteSmall from "../../merchandisingUI/CustomAutocompleteSmall";
import CustomTextInputSmall from "../../merchandisingUI/CustomTextInputSmall";
import CustomButtonSmall from "../../merchandisingUI/CustomButtonSmall";

const EstimateCostingInput = () => {
  return (
    <>
      <CustomAppBar title={"input parameters"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"0px"}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocompleteSmall label={"Style No"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocompleteSmall
              label={"Version No"}
              name="buyer"
              optionLabel={"cBuyer_Name"}
              optionId={"nBuyer_ID"}
              //   options={buyerData ?? []}
              //   value={buyer}
              //   loading={buyerLoading}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Buyer"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Season"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Store"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Brand"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Garment Type"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Garment Division"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Order Qty"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"GMT Dept"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Remarks"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomButtonSmall
              title={"View approved style"}
              fullWidth
              // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EstimateCostingInput;

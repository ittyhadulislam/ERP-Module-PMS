import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import CustomAutocompleteSmall from "../../merchandisingUI/CustomAutocompleteSmall";
import CustomTextInputSmall from "../../merchandisingUI/CustomTextInputSmall";

const EstimateBomInput = () => {
  return (
    <>
      <CustomAppBar title={"input parameters"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"0px"}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocompleteSmall label={"Style No"} />
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <CustomAutocompleteSmall
              label={"Version"}
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
          <Grid item xs={12} sm={6} md={1.5}>
            <CustomTextInputSmall
              //   setValue={setValue}
              label={"Store"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"GMT Dept"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Buyer"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Brand"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocompleteSmall
              label={"Currency type"}
              name="style"
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   options={styleData ?? []}
              //   value={style}
              //   loading={styleLoading}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Season"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"GMT Type"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall
              label={"Order Qty"}
              name="itemDescription"
              value={"itemDescription"}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall
              label={"Order Type"}
              name="deliveryAddress"
              //   value={deliveryAddress}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
              //   disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextInputSmall
              label={""}
              name="deliveryAddress"
              //   value={deliveryAddress}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
              //   disabled={disableAll}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EstimateBomInput;

import { Box } from "@mui/system";
import React from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Grid } from "@mui/material";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomTextInput from "../inputs/CustomTextInput";

const GeneralInfoInput = ({ localState, setLocalState }) => {
  const { style, buyer, brandName, season, itemQuantity } = localState;
  return (
    <>
      <CustomAppBar title={"GENERAL INFO"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Style"}
              name="style"
              options={[]}
              value={style}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isStyleLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextInput
              label={"Buyer"}
              name="buyer"
              value={buyer}
              // isNumber={true}
              // maxLength={6}
              // value={finishingQty}
              // setStateValue={setFinishingQty}
              // required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextInput
              label={"Brand Name"}
              name="brandName"
              value={brandName}
              // isNumber={true}
              // maxLength={6}
              // value={finishingQty}
              // setStateValue={setFinishingQty}
              // required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextInput
              label={"Season"}
              name="season"
              value={season}
              // isNumber={true}
              // maxLength={6}
              // value={finishingQty}
              // setStateValue={setFinishingQty}
              // required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextInput
              label={"Item Quantity"}
              name="itemQuantity"
              value={itemQuantity}
              // isNumber={true}
              // maxLength={6}
              // value={finishingQty}
              // setStateValue={setFinishingQty}
              // required={true}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default GeneralInfoInput;

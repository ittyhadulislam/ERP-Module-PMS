import React, { useState } from "react";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import { Box, Grid } from "@mui/material";
import CustomAppBar from "../common/CustomAppBar";
import CustomTextInput from "../inputs/CustomTextInput";

const SizeInfo = () => {
  const [d, setd] = useState(null);
  return (
    <Box sx={{ p: 1, border: "1px dashed grey", mr: "1px" }}>
      <CustomAppBar title={"SIZE INFO"} />
      <Grid container spacing={1} mt={"5px"}>
        <Grid item xs={12} sm={4} md={2}>
          <CustomAutocomplete
            // setValue={setValue}
            label={"Size"}
            options={[]}
            // value={selectedStyle}
            optionLabel={"cStyleNo"}
            optionId={"nStyleID"}
            // loading={isLoading}
            // setSelectedValue={setSelectedStyle}
            // required={true}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={2}>
          <CustomTextInput
            label={"Sewing Qty"}
            name="buyer"
            type="number"
            // value={
            //   selectedStyle === null
            //     ? ""
            //     : StyleDetails && StyleDetails[0]?.cBuyer_Name
            // }
            // register={register}
            // disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <CustomTextInput
            label={"Total Order Qty"}
            name="buyer"
            type="number"
            // value={
            //   selectedStyle === null
            //     ? ""
            //     : StyleDetails && StyleDetails[0]?.cBuyer_Name
            // }
            // register={register}
            // disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <CustomTextInput
            label={"Total Input Qty"}
            name="buyer"
            type="number"
            // value={
            //   selectedStyle === null
            //     ? ""
            //     : StyleDetails && StyleDetails[0]?.cBuyer_Name
            // }
            // register={register}
            // disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <CustomTextInput
            label={"Total Production Qty"}
            name="buyer"
            type="number"
            // value={
            //   selectedStyle === null
            //     ? ""
            //     : StyleDetails && StyleDetails[0]?.cBuyer_Name
            // }
            // register={register}
            // disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <CustomTextInput
            label={"Total Balance Qty"}
            name="buyer"
            type="number"
            setStateValue={setd}
            value={d}
            // value={
            //   selectedStyle === null
            //     ? ""
            //     : StyleDetails && StyleDetails[0]?.cBuyer_Name
            // }
            // register={register}
            // disabled={true}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SizeInfo;

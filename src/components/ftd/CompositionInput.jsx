import React from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomTextInput from "../inputs/CustomTextInput";

const CompositionInput = ({ localState, setLocalState }) => {
  const { material, ratio, yarnCount, fabricType, count, ppiEpi, gsm } =
    localState;
  return (
    <>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"COMPOSITION"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Material"}
              name="material"
              options={[]}
              value={material}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isStyleLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Ratio %"}
              name="ratio"
              options={[]}
              value={ratio}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isStyleLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Fabric Type"}
              name="fabricType"
              setLocalState={setLocalState}
              value={fabricType}

              // isNumber={true}
              // maxLength={6}
              // value={finishingQty}
              // setStateValue={setFinishingQty}
              // required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Yarn Count Direction"}
              name="yarnCount"
              options={[]}
              value={yarnCount}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isStyleLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Count"}
              name="count"
              setLocalState={setLocalState}
              value={count}

              // isNumber={true}
              // maxLength={6}
              // value={finishingQty}
              // setStateValue={setFinishingQty}
              // required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"PPI EPI"}
              name="ppiEpi"
              setLocalState={setLocalState}
              value={ppiEpi}

              // isNumber={true}
              // maxLength={6}
              // value={finishingQty}
              // setStateValue={setFinishingQty}
              // required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"GSM"}
              name="gsm"
              setLocalState={setLocalState}
              value={gsm}

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

export default CompositionInput;

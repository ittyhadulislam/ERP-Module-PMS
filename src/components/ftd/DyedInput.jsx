import { Box } from "@mui/system";
import React from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import { Grid } from "@mui/material";

const DyedInput = ({ localState, setLocalState }) => {
  const {
    yarnDyed,
    dyedType,
    solidDyed,
    DyedRegularFinishing,
    dyedSpecial,
    dyedCoating,
  } = localState;
  return (
    <>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"DYED PROCESS"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Yarn Dyed"}
              name="yarnDyed"
              options={[]}
              value={yarnDyed}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isStyleLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Type"}
              name="dyedType"
              options={[]}
              value={dyedType}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isStyleLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Solid Dyed"}
              name="solidDyed"
              options={[]}
              value={solidDyed}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isStyleLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Regular Finishing"}
              name="DyedRegularFinishing"
              options={[]}
              value={DyedRegularFinishing}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isStyleLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Special"}
              name="dyedSpecial"
              options={[]}
              value={dyedSpecial}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isStyleLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Coating"}
              name="dyedCoating"
              options={[]}
              value={dyedCoating}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isStyleLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DyedInput;

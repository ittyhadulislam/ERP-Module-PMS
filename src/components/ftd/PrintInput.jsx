import { Box } from "@mui/system";
import React from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import { Grid } from "@mui/material";

const PrintInput = ({ localState, setLocalState }) => {
  const {
    printType,
    printRoute,
    printRegularFinishing,
    printSpecial,
    printCoating,
  } = localState;
  return (
    <>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"PRINT PROCESS"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Type"}
              name="printType"
              options={[]}
              value={printType}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   loading={isStyleLoading}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Route"}
              name="printRoute"
              options={[]}
              value={printRoute}
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
              name="printRegularFinishing"
              options={[]}
              value={printRegularFinishing}
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
              name="printSpecial"
              options={[]}
              value={printSpecial}
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
              name="printCoating"
              options={[]}
              value={printCoating}
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

export default PrintInput;

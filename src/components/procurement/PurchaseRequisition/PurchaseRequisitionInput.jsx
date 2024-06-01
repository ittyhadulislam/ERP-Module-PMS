import { Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import CustomAutocompleteSmall from "../../merchandisingUI/CustomAutocompleteSmall";
import CustomTextInputSmall from "../../merchandisingUI/CustomTextInputSmall";
import AddButtonSmall from "../../merchandisingUI/AddButtonSmall";

const PurchaseRequisitionInput = () => {
  return (
    <>
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"-5px"}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocompleteSmall label={"Company"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocompleteSmall label={"Department"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocompleteSmall label={"Store"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocompleteSmall label={"Section"} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"-5px"}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocompleteSmall label={"Main Category"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocompleteSmall label={"Sub Category"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocompleteSmall label={"Size"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocompleteSmall label={"Brand"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Available Stock"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Required Quantity"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocompleteSmall label={"Unit"} />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <CustomTextInputSmall label={"Total Value"} />
          </Grid> */}
        </Grid>
      </Box>
      <Box sx={{ my: 1, mb: 0, border: "1px dashed grey" }}>
        <Stack
          direction={"row"}
          p={0.5}
          spacing={2}
          justifyContent="space-between"
        >
          <span></span>

          <span>
            <AddButtonSmall
              title={"Add"}
              type="submit"
              // handleClick={handleAdd}
              //   loading={isStyleLoading}
              //   disabled={isStyleLoading}
            />
          </span>
        </Stack>
      </Box>
    </>
  );
};

export default PurchaseRequisitionInput;

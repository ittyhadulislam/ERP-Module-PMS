import React from "react";
import CreateNewInvoiceInput from "./CreateNewInvoiceInput";
import AvailablePO from "./AvailablePO";
import SelectedPO from "./SelectedPO";
import { Box, Grid, Stack } from "@mui/material";
import SelectedPoDetails from "./SelectedPoDetails";
import ReturnButtonSmall from "../../merchandisingUI/ReturnButtonSmall";
import SubmitButtonSmall from "../../merchandisingUI/SubmitButtonSmall";

const CreateNewInvoiceContainer = () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item sx={12} sm={5} mt={0.5} width={"100%"}>
          <CreateNewInvoiceInput />
          <Grid container spacing={1}>
            <Grid item sx={12} sm={6} mt={0.5} width={"100%"}>
              <AvailablePO />
            </Grid>
            <Grid item sx={12} sm={6} mt={0.5} width={"100%"}>
              <SelectedPO />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={12} sm={7} mt={0.5} width={"100%"}>
          <SelectedPoDetails />
        </Grid>
      </Grid>

      <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px", mb: "1px" }}>
        <Stack
          direction={"row"}
          p={0.5}
          spacing={2}
          justifyContent="space-between"
        >
          <span></span>

          <span style={{ margin: "0px" }}>
            <ReturnButtonSmall
              title={"rename pi"}
              handleClick={() => handleClick("check")}
              //   loading={checkLoading}
              //   disabled={isDisabled || showApproval}
            />
            <SubmitButtonSmall
              title={"save"}
              handleClick={() => handleClick("check")}
              //   loading={checkLoading}
              //   disabled={isDisabled || showApproval}
            />
          </span>
        </Stack>
      </Box>
    </>
  );
};

export default CreateNewInvoiceContainer;

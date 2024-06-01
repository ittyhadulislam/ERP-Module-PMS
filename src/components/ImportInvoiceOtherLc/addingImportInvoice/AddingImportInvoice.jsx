import { Box } from "@mui/system";
import React from "react";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import InvoiceInput from "./InvoiceInput";
import { Grid } from "@mui/material";
import PIInformation from "./PIInformation";
import AddInput from "./AddInput";
import AddButton from "./AddButton";

const AddingImportInvoice = () => {
  return (
    <>
      <Box sx={{ my: 1 }}>
        <CustomAutocomplete
          //   setValue={setValue}
          label={"Supplier"}
          options={[]}
          //   value={selectedStyle}
          optionLabel={"cStyleNo"}
          optionId={"nStyleID"}
          //   loading={isLoading}
          //   setSelectedValue={setSelectedStyle}
          required={true}
        />
      </Box>
      <Grid container spacing={0.5} mb={0.5}>
        <Grid item md={12} lg={6}>
          <InvoiceInput />
        </Grid>
        <Grid item md={12} lg={6}>
          <PIInformation />
        </Grid>
      </Grid>
      <AddInput />
      <AddButton />
    </>
  );
};

export default AddingImportInvoice;

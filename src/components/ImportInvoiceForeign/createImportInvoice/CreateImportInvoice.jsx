import { Grid } from "@mui/material";
import React from "react";
import InvoiceInput from "./InvoiceInput";
import PIList from "./PIList";
import GrnList from "./GrnList";
import AddGrnList from "./AddGrnList";
import InvoiceForeignButton from "./InvoiceForeignButton";

const CreateImportInvoice = ({ setGoToTab }) => {
  return (
    <Grid container spacing={0.5}>
      <Grid item md={12} lg={6}>
        <InvoiceInput />
        <GrnList />
      </Grid>
      <Grid item md={12} lg={6}>
        <PIList />
        <AddGrnList />
        <InvoiceForeignButton setGoToTab={setGoToTab} />
      </Grid>
    </Grid>
  );
};

export default CreateImportInvoice;

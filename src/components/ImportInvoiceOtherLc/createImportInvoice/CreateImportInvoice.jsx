import { Grid } from "@mui/material";
import React from "react";
import InvoiceInput from "./InvoiceInput";
import PIList from "./PIList";
import PI from "./PI";

const CreateImportInvoice = () => {
  return (
    <Grid container spacing={0.5}>
      <Grid item md={12} lg={6}>
        <InvoiceInput />
        <PI />
      </Grid>
      <Grid item md={12} lg={6}>
        <PIList />
      </Grid>
    </Grid>
  );
};

export default CreateImportInvoice;

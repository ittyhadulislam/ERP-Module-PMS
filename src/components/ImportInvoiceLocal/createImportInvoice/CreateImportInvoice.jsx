import { Grid } from "@mui/material";
import React from "react";
import InvoiceInput from "./InvoiceInput";
import PIList from "./PIList";
import PI from "./PI";
import GrnList from "./GrnList";
import AddGrnList from "./AddGrnList";
import InvoiceLocalButton from "./InvoiceLocalButton";

const CreateImportInvoice = ({ setGoToTab }) => {
  return (
    <Grid container spacing={0.5}>
      <Grid item md={12} lg={6}>
        <InvoiceInput />
        <GrnList />
        {/* <PI /> */}
      </Grid>
      <Grid item md={12} lg={6}>
        <PIList />
        <AddGrnList />
        <InvoiceLocalButton setGoToTab={setGoToTab} />
      </Grid>
    </Grid>
  );
};

export default CreateImportInvoice;

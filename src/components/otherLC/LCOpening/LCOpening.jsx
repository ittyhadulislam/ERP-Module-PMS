import React from "react";
import { Grid } from "@mui/material";
import LCInput from "./LCInput";
import AddMasterLCItem from "./AddMasterLCItem";
import AvailablePI from "./AvailablePI";

const LCOpening = () => {
  return (
    <Grid container spacing={0.5}>
      <Grid item md={12} lg={6}>
        <LCInput />
        <AddMasterLCItem />
      </Grid>
      <Grid item md={12} lg={6}>
        <AvailablePI />
      </Grid>
    </Grid>
  );
};

export default LCOpening;

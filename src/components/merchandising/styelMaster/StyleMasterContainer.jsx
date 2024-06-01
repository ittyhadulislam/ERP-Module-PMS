import React from "react";
import StyleMasterInput from "./StyleMasterInput";
import CreateButtons from "./CreateButtons";
import DeliveryInformation from "./DeliveryInformation";
import ActionButton from "./ActionButton";
import { Grid } from "@mui/material";
import SpecialOperation from "./SpecialOperation";

const StyleMasterContainer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={5}>
            {/* input fields */}
            <StyleMasterInput />
            {/* create buttons */}
            <CreateButtons />
          </Grid>
          <Grid item xs={12} sm={7}>
            {/* Delivery Information */}
            <DeliveryInformation />
            {/* special operation */}
            <SpecialOperation />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default StyleMasterContainer;

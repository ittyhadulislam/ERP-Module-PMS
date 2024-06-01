import React from "react";
import GenerateBarcodeInput from "../../components/Cutting/generateBarcode/GenerateBarcodeInput";
import { Box } from "@mui/material";

const GenerateBarcode = () => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "#17a2b8",
        p: 1,
        boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
      }}
    >
      <GenerateBarcodeInput />
    </Box>
  );
};

export default GenerateBarcode;

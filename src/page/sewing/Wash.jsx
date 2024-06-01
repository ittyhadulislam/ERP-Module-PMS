import { Box } from "@mui/material";
import React from "react";
import CuttingLayRationInput from "../../components/Cutting/cuttingLayRatio/CuttingLayRationInput";
import WashInput from "../../components/sewing/wash/WashInput";

const Wash = () => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "#17a2b8",
        p: 1,
        boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
      }}
    >
      <WashInput />
    </Box>
  );
};

export default Wash;

import { Box } from "@mui/material";
import React, { useState } from "react";
import CutMasterInput from "../../components/cutMaster/CutMasterInput";
import CutMasterView from "../../components/cutMaster/CutMasterView";

const CutMaster = () => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "#17a2b8",
        p: 1,
        boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
      }}
    >
      <CutMasterInput />
      <CutMasterView />
    </Box>
  );
};

export default CutMaster;

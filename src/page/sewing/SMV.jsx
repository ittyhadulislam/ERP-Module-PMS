import { Box } from "@mui/material";
import React from "react";
import SMVInput from "../../components/sewing/smv/SMVInput";

const SMV = () => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "#17a2b8",
        p: 1,
        boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
      }}
    >
      <SMVInput />
    </Box>
  );
};

export default SMV;

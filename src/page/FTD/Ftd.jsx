import { Box } from "@mui/system";
import React from "react";
import FtdInput from "../../components/ftd/FtdInput";

const Ftd = () => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "#17a2b8",
        p: 1,
        boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
      }}
    >
      <FtdInput />
    </Box>
  );
};

export default Ftd;

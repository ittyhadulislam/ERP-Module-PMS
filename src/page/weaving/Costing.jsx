import React from "react";
import CostingContainer from "../../components/weaving/costing/CostingContainer";
import { Box } from "@mui/system";

const Costing = () => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "#17a2b8",
        p: 1,
        boxShadow: " 0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
      }}
    >
      <CostingContainer />
    </Box>
  );
};

export default Costing;

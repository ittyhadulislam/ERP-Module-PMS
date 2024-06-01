import { Box, Typography } from "@mui/material";
import React from "react";

const CardDetails = ({ title, amount, icon, bgColor }) => {
  return (
    <Box
      sx={{
        p: 0.6,
        borderRadius: "4px",
        // backgroundColor: "#a50471",
        backgroundColor: bgColor,
        color: "white",
      }}
    >
      <Typography>
        {icon}
        <small>
          {title} <span style={{ fontSize: "12px" }}>{amount}</span>
        </small>
      </Typography>
    </Box>
  );
};

export default CardDetails;

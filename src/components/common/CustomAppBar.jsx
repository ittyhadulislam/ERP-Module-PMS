import { AppBar, Box, Typography } from "@mui/material";
import React from "react";
import { FaListUl } from "react-icons/fa";

const CustomAppBar = ({ title }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ borderRadius: "3px 3px 0px 0px", boxShadow: "none" }}
      >
        <Box
          style={{
            height: "40px !important",
            display: "flex",
            padding: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaListUl />
          <Typography
            variant="p"
            component="div"
            sx={{ flexGrow: 1, ml: 2, textTransform: "uppercase" }}
          >
            {title}
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Box>
      </AppBar>
    </Box>
  );
};

export default CustomAppBar;

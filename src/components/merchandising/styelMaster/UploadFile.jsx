import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box, Grid } from "@mui/material";

const UploadFile = () => {
  return (
    <>
      <CustomAppBar title={"Upload file"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12} sm={7} md={4} border={"1px solid red"}>
            hello
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UploadFile;

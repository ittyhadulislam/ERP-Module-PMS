import { Box, Button, Grid, Stack } from "@mui/material";
import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomButtonSmall from "../../merchandisingUI/CustomButtonSmall";
import { ResetTvOutlined } from "@mui/icons-material";
const ActionButton = () => {
  return (
    <>
      <CustomAppBar title={"actions"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={0.5}>
          <Grid item xs={12} sm={12} md={6}>
            <CustomButtonSmall
              title={"buyer"}
              fullWidth
              // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CustomButtonSmall
              title={"Garments Dept"}
              fullWidth
              // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CustomButtonSmall
              title={"season"}
              fullWidth
              // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CustomButtonSmall
              title={"brand"}
              fullWidth
              // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CustomButtonSmall
              title={"Garments Type"}
              fullWidth
              // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CustomButtonSmall
              title={"store"}
              fullWidth
              // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ActionButton;

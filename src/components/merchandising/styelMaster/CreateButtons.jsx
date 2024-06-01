import { Box, Grid } from "@mui/material";
import React from "react";
import CustomButtonSmall from "../../merchandisingUI/CustomButtonSmall";

const CreateButtons = () => {
  return (
    <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
      <Grid container spacing={0.3}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomButtonSmall
            title={"buyer"}
            fullWidth
            // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomButtonSmall
            title={"Garments Dept"}
            fullWidth
            // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomButtonSmall
            title={"season"}
            fullWidth
            // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomButtonSmall
            title={"brand"}
            fullWidth
            // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomButtonSmall
            title={"Garments Type"}
            fullWidth
            // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomButtonSmall
            title={"store"}
            fullWidth
            // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateButtons;

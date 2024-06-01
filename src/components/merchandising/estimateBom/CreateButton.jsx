import { Box, Grid } from "@mui/material";
import React from "react";
import CustomButtonSmall from "../../merchandisingUI/CustomButtonSmall";

const CreateButton = () => {
  return (
    <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
      <Grid container spacing={0.3}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={0.3}>
            <Grid item xs={12} sm={6} md={4}>
              <CustomButtonSmall
                title={"sub category"}
                fullWidth
                // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomButtonSmall
                title={"construction"}
                fullWidth
                // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomButtonSmall
                title={"dimension"}
                fullWidth
                // icon={<ResetTvOutlined sx={{ mr: 1, fontSize: "13px" }} />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateButton;

import React from "react";
import { Box, Grid } from "@mui/material";
import CustomTable from "../../table/CustomTable";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTextInput from "../../inputs/CustomTextInput";
import SubmitButton from "../../buttons/SubmitButton";

const Division = () => {
  const columns = [{}];
  return (
    <Grid
      container
      sx={{
        border: `1px solid #1976d2`,
        padding: "10px",
        borderRadius: "2px",
      }}
    >
      <Grid item xs={12}>
        <form>
          <CustomAppBar title={"Form Parameter"} />
          <Grid sx={{ border: `1px solid #1976d2`, padding: "5px" }}>
            <Grid container spacing={1} mt={0.1}>
              <Grid item xs={12} md={4}>
                <CustomTextInput
                  label="Division Name"
                  //   formik={formik}
                  id={"div_name"}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextInput
                  label="Division Name (Bangla)"
                  //   formik={formik}
                  id={"div_name_bangla"}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4} mt={"-2px"}>
                <SubmitButton
                  //   title={selectedRow ? "Update" : "Submit"}
                  fullWidth
                  title={"add"}
                  type="submit"
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12} mt={1}>
        <Box>
          <CustomTable
            columns={columns}
            // loading={divisionLoading}
            rows={[]}
            height={[].length > 0 ? "50vh" : "350px"}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Division;

import React from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import { formateDate } from "../../utils/formateDate";

const AmendmentModal = ({ data = [], singleData = [] }) => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <CustomAppBar title={"Amendment Master"} />
          <Grid container spacing={1} mt={"1px"}>
            <Grid item xs={12}>
              <Box sx={{ border: "1px solid #1976d2", p: 1 }}>
                {singleData.length > 0 &&
                  Object.keys(singleData[0])?.map((e, i) => (
                    <Grid
                      container
                      sx={{
                        backgroundColor: `${i % 2 === 0 ? "lightGray" : ""}`,
                        border: "1px solid gray",
                        m: "2px",
                        pl: 0.5,
                      }}
                      key={i}
                    >
                      <Grid item xs={6}>
                        {e}
                      </Grid>
                      <Grid item xs={6}>
                        {singleData[0][e]}
                      </Grid>
                    </Grid>
                  ))}
              </Box>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              pol
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomAppBar title={"Style Details"} />
          <Grid container spacing={1} mt={"1px"}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ border: "1px solid #1976d2", p: 1 }}>
                <Box sx={{ fontSize: "1.5rem" }}>PI No</Box>

                {data?.map((e, i) => (
                  <Box
                    sx={{
                      backgroundColor: `${i % 2 === 0 ? "lightGray" : ""}`,
                      border: "1px solid gray",
                      m: "2px",
                      pl: 0.5,
                    }}
                    key={i}
                  >
                    {e.pI_NO}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ border: "1px solid #1976d2", p: 1 }}>
                <Box sx={{ fontSize: "1.5rem" }}>PI Value</Box>

                {data?.map((e, i) => (
                  <Box
                    sx={{
                      backgroundColor: `${i % 2 === 0 ? "lightGray" : ""}`,
                      border: "1px solid gray",
                      m: "2px",
                      pl: 0.5,
                    }}
                    key={i}
                  >
                    {e.pI_Value}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ border: "1px solid #1976d2", p: 1 }}>
                <Box sx={{ fontSize: "1.5rem" }}>PI Date</Box>

                {data?.map((e, i) => (
                  <Box
                    sx={{
                      backgroundColor: `${i % 2 === 0 ? "lightGray" : ""}`,
                      border: "1px solid gray",
                      m: "2px",
                      pl: 0.5,
                    }}
                    key={i}
                  >
                    {formateDate(e.pI_Dt)}
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AmendmentModal;

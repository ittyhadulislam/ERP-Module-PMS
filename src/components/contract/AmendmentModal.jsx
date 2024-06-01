import React from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Box, Grid } from "@mui/material";

const AmendmentModal = ({ data = [], singleData = [] }) => {
  const singleDataObj =
    singleData?.map((item) => ({
      amandmentNO: item.amandmentNO,
      cContractNo: item.cContractNo,
      cCmpName: item.cCmpName,
      cBuyer_Name: item.cBuyer_Name,
      issuingBank_Name: item.issuingBank_Name,
      negotiableBank_Name: item.negotiableBank_Name,
      receivingBank_Name: item.receivingBank_Name,
      b2BLc: item.b2BLc,
      paymentTerm_Name: item.paymentTerm_Name,
      cShipMode: item.cShipMode,
      dOpeningDate: item.dOpeningDate,
      dAmendmentDate: item.dAmendmentDate,
      dLastShipDate: item.dLastShipDate,
      dExpireDate: item.dExpireDate,
      nCurrencyType: item.nCurrencyType,
      cUDVersion: item.cUDVersion,
      nFrightValue: item.nFrightValue,
      dPartialshipment: item.dPartialshipment,
      created_Date: item.created_Date,
      totalPOQty: item.totalPOQty,
      totalCommission: item.totalCommission,
      contractValue: item.contractValue,
      calculateValue: item.calculateValue,
      status: item.status,
    }))[0] || {};

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={7}>
          <CustomAppBar title={"Amendment Master"} />
          <Grid container spacing={1} mt={"1px"}>
            <Grid item xs={12}>
              <Box sx={{ border: "1px solid #1976d2", p: 1 }}>
                {Object.keys(singleDataObj)?.map((e, i) => (
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
                      {singleDataObj[e]}
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
        <Grid item xs={12} sm={5}>
          <CustomAppBar title={"Style Details"} />
          <Grid container spacing={1} mt={"1px"}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ border: "1px solid #1976d2", p: 1 }}>
                <Box sx={{ fontSize: "1.5rem" }}>Contract No</Box>

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
                    {e.cDispStyleNo}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ border: "1px solid #1976d2", p: 1 }}>
                <Box sx={{ fontSize: "1.5rem" }}>Style No</Box>

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
                    {e.cStyleNo}
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

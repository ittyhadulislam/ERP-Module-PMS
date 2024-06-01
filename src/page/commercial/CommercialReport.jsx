import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import ReportList from "../../components/commercialReport/ReportList";
import ReportParameter from "../../components/commercialReport/ReportParameter";
import { useDispatch, useSelector } from "react-redux";
import { setCommercialReport } from "../../redux/features/commercial/report/commercialReportSlice";
import ReportViewer from "../../components/report/ReportViewer";
const CommercialReport = () => {
  const dispatch = useDispatch();
  const { title, modalOpen, reportData } = useSelector(
    (state) => state.commercialReport
  );

  // modal close fn
  const close = (e) => {
    dispatch(setCommercialReport({ key: "modalOpen", value: e }));
  };

  // handle submit fn
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          border: 1,
          borderColor: "#17a2b8",
          p: 1,
          boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <ReportList />
          </Grid>
          {/* parameter */}
          <Grid item xs={12} sm={6}>
            <ReportParameter />
          </Grid>
        </Grid>
      </Box>
      <ReportViewer
        title={title}
        modalOpen={modalOpen}
        setModalOpen={close}
        reportData={reportData}
      />
    </form>
  );
};

export default CommercialReport;

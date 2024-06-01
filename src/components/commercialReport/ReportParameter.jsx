import React from "react";
import { Box, Grid } from "@mui/material";
import CustomAppBar from "../common/CustomAppBar";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import ReportButton from "../buttons/ReportButton";
import { useSelector } from "react-redux";
import { setCommercialReport } from "../../redux/features/commercial/report/commercialReportSlice";

const ReportParameter = () => {
  const { company, masterLcNo } = useSelector(
    (state) => state.commercialReport
  );
  return (
    <>
      <CustomAppBar title={"REPORT PARAMETER'S"} />
      <Box
        sx={{
          p: 1,
          border: "1px dashed grey",
          borderTop: "none",
          height: "calc(100% - 40px)",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Company"}
              name="company"
              optionLabel={"name"}
              optionId={"value"}
              options={[{ name: "ddd", value: "123" }]} //company ? yearData ?? [] :
              value={company}
              // loading={isCompanyLoading}
              // setSelectedValue={setCompany}
              // disabled={companyDisable}
              setReduxState={setCommercialReport}
              required={true}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Master LC No"}
              name="masterLcNo"
              optionLabel={"cCmpName"}
              optionId={"nCompanyID"}
              options={[]} //company ? yearData ?? [] :
              value={masterLcNo}
              setReduxState={setCommercialReport}
              // loading={isCompanyLoading}
              // setSelectedValue={setCompany}
              // disabled={companyDisable}
              required={true}
            />
          </Grid>

          <Grid item xs={12}>
            <ReportButton
              title={"view report"}
              type="submit"
              fullWidth
              // loading={dailyReportLoading || exportStyleWiseReportLoading}
              //   disabled={title === ""}
              // handleClick={}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ReportParameter;

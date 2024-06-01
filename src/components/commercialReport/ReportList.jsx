import React from "react";
import { Box } from "@mui/material";
import CustomAppBar from "../common/CustomAppBar";
import SelectReport from "../common/SelectReport";
import { setCommercialReport } from "../../redux/features/commercial/report/commercialReportSlice";

const ReportList = () => {
  return (
    <>
      <CustomAppBar title={"REPORT LIST"} />
      <Box
        sx={{
          p: 1,
          border: "1px dashed grey",
          borderTop: "none",
          height: "calc(100% - 40px)",
        }}
      >
        <SelectReport
          options={[
            {
              value: "Master LC Details (Styles / PO)- Selected",
              label: "Master LC Details (Styles / PO)- Selected",
            },
            {
              value: "Date wise Individual Master LC Summary",
              label: "Date wise Individual Master LC Summary",
            },
            {
              value: "Date wise Master LC Amendments",
              label: "Date wise Master LC Amendments",
            },
            {
              value: "Master LC Status Details",
              label: "Master LC Status Details",
            },
            {
              value: "Master LC - B2B not Created for PO",
              label: "Master LC - B2B not Created for PO",
            },
            {
              value: "B2B LC Details - Selected",
              label: "B2B LC Details - Selected",
            },
            {
              value: "Import Invoice Details Date wise",
              label: "Import Invoice Details Date wise",
            },
            {
              value: "B2B LC Opening Details Date wise",
              label: "B2B LC Opening Details Date wise",
            },
            {
              value: "B2B Acceptance Date wise",
              label: "B2B Acceptance Date wise",
            },
            {
              value: "B2B Submission Date wise",
              label: "B2B Submission Date wise",
            },
            {
              value: "B2B Maturity Date wise",
              label: "B2B Maturity Date wise",
            },
            {
              value: "B2B LC Status (File No. Wise)",
              label: "B2B LC Status (File No. Wise)",
            },
            {
              value: "B2B PI Pending",
              label: "B2B PI Pending",
            },
            {
              value: "Other LC Date wise - Details",
              label: "Other LC Date wise - Details",
            },
            {
              value: "Other LC Acceptance Date wise",
              label: "Other LC Acceptance Date wise",
            },
            {
              value: "Submission to Bank",
              label: "Submission to Bank",
            },
            {
              value: "Master LC Profit & Loss - Selected MLC",
              label: "Master LC Profit & Loss - Selected MLC",
            },
            {
              value: "Export Statement",
              label: "Export Statement",
            },
            {
              value: "Master LC Profit & Loss Summary",
              label: "Master LC Profit & Loss Summary",
            },
            {
              value: "Export Statement - Selected MLC",
              label: "Export Statement - Selected MLC",
            },
            {
              value: "Master LC Profit & Loss - Style wise",
              label: "Master LC Profit & Loss - Style wise",
            },
            {
              value: "Non Realization",
              label: "Non Realization",
            },
            {
              value: "Proceed Realization Certificate",
              label: "Proceed Realization Certificate",
            },
          ]}
          id="reportName"
          title="Report Name"
          setReduxState={setCommercialReport}
          // setTitle={setTitle}
        />
      </Box>
    </>
  );
};

export default ReportList;

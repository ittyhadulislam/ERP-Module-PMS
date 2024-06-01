import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import GeneratePoTab from "../../components/procurement/generatePo/GeneratePoTab";
import EditAndConfirm from "../../components/procurement/generatePo/EditAndConfirm";
import PoForApproval from "../../components/procurement/generatePo/PoForApproval";
import Approved from "../../components/procurement/generatePo/Approved";
import Cancelled from "../../components/procurement/generatePo/Cancelled";
import CustomAutocompleteSmall from "../../components/merchandisingUI/CustomAutocompleteSmall";

const GeneratePo = () => {
  return (
    <>
      <Box sx={{ p: 1, border: "1px solid #17a2b8" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={5}>
            <CustomAutocompleteSmall
              label={"Company"}
              name="company"
              options={[]}
              // value={company}
              optionLabel={"cCmpName"}
              optionId={"nCompanyID"}
              // loading={companyLoading}
              // setSelectedValue={setCompany}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
      <TabPanel
        tabData={[
          {
            label: "generate Po",
            components: <GeneratePoTab />,
          },
          {
            label: "edit/Confirm",
            components: <EditAndConfirm />,
          },
          {
            label: "PO For Approval",
            components: <PoForApproval />,
          },
          {
            label: "Approved",
            components: <Approved />,
          },
          {
            label: "Cancelled",
            components: <Cancelled />,
          },
        ]}
      />
    </>
  );
};

export default GeneratePo;

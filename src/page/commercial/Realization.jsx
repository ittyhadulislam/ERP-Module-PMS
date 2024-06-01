import { Box } from "@mui/system";
import React from "react";
import CustomAutocomplete from "../../components/inputs/CustomAutocomplete";
import TabPanel from "../../components/tabPannel/TabPanel";
import RealizationInput from "../../components/realization/RealizationInput";
import EditAndViewExportInvoice from "../../components/realization/EditAndViewExportInvoice";

const Realization = () => {
  return (
    <>
      <Box sx={{ my: 1 }}>
        <CustomAutocomplete
          //   setValue={setValue}
          label={"Company"}
          options={[]}
          //   value={selectedStyle}
          optionLabel={"cStyleNo"}
          optionId={"nStyleID"}
          //   loading={isLoading}
          //   setSelectedValue={setSelectedStyle}
          required={true}
        />
      </Box>
      <TabPanel
        tabData={[
          {
            label: "Realization",
            components: <RealizationInput />,
          },
          {
            label: "edit/View",
            components: <EditAndViewExportInvoice />,
          },
        ]}
      />
    </>
  );
};

export default Realization;

import { Box } from "@mui/system";
import React from "react";
import CustomAutocomplete from "../../components/inputs/CustomAutocomplete";
import TabPanel from "../../components/tabPannel/TabPanel";
import ExportInvoiceInput from "../../components/invoiceSubmission/ExportInvoiceInput";
import EditAndViewExportInvoice from "../../components/invoiceSubmission/EditAndViewExportInvoice";

const InvoiceSubmission = () => {
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
            label: "Export Invoice",
            components: <ExportInvoiceInput />,
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

export default InvoiceSubmission;

import { Box } from "@mui/material";
import React from "react";
import CustomAutocomplete from "../../components/inputs/CustomAutocomplete";
import TabPanel from "../../components/tabPannel/TabPanel";
import EditAndViewExportInvoice from "../../components/exportInvoice/EditAndViewExportInvoice";
import ExportInvoiceInput from "../../components/exportInvoice/ExportInvoiceInput";
import { setExportInvoice } from "../../redux/features/commercial/exportInvoice/exportInvoiceSlice";
import { useGetComCompanyQuery } from "../../redux/features/commercial/contract/queryContract";
import { useSelector } from "react-redux";
const ExportInvoice = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const { company } = useSelector((state) => state.exportInvoice);

  // get company data
  const { data, isLoading } = useGetComCompanyQuery(userName);

  return (
    <>
      <Box sx={{ my: 1 }}>
        <CustomAutocomplete
          label={"Company"}
          name="company"
          options={data?.data ?? []}
          value={company}
          optionLabel={"company_Name"}
          optionId={"company_ID"}
          loading={isLoading}
          setReduxState={setExportInvoice}
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

export default ExportInvoice;

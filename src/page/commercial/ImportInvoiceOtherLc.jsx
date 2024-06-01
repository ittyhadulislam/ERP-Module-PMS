import React from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import CreateImportInvoice from "../../components/ImportInvoiceOtherLc/createImportInvoice/CreateImportInvoice";
import AddingImportInvoice from "../../components/ImportInvoiceOtherLc/addingImportInvoice/AddingImportInvoice";
import EditAndViewImportInvoice from "../../components/ImportInvoiceOtherLc/EditAndViewImportInvoice";

const ImportInvoiceOtherLc = () => {
  return (
    <>
      <TabPanel
        tabData={[
          {
            label: "Create Import Invoice",
            components: <CreateImportInvoice />,
          },
          {
            label: "adding import invoice",
            components: <AddingImportInvoice />,
          },
          {
            label: "edit/view import invoice",
            components: <EditAndViewImportInvoice />,
          },
        ]}
      />
    </>
  );
};

export default ImportInvoiceOtherLc;

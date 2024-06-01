import React, { useState } from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import CreateImportInvoice from "../../components/ImportInvoiceLocal/createImportInvoice/CreateImportInvoice";
import AddingImportInvoice from "../../components/ImportInvoiceLocal/addingImportInvoice/AddingImportInvoice";
import EditAndViewImportInvoice from "../../components/ImportInvoiceLocal/EditAndViewImportInvoice";

const ImportInvoiceLocal = () => {
  const [goToTab, setGoToTab] = useState(0);
  return (
    <>
      <TabPanel
        tabData={[
          {
            label: "Create Import Invoice",
            components: <CreateImportInvoice setGoToTab={setGoToTab} />,
          },
          {
            label: "adding import invoice",
            components: <AddingImportInvoice />,
            disabled: true,
          },
          {
            label: "edit/view import invoice",
            components: <EditAndViewImportInvoice />,
          },
        ]}
        activeTab={goToTab}
        setActiveTab={setGoToTab}
      />
    </>
  );
};

export default ImportInvoiceLocal;

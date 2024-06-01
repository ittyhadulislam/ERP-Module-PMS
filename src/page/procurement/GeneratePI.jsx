import React from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import EditAndViewTab from "../../components/procurement/generatePi/EditAndViewTab";
import CreateNewInvoice from "../../components/procurement/generatePi/CreateNewInvoice";

const GeneratePI = () => {
  return (
    <>
      {" "}
      <TabPanel
        tabData={[
          {
            label: "create new invoice",
            components: <CreateNewInvoice />,
          },
          {
            label: "edit/view",
            components: <EditAndViewTab />,
          },
        ]}
      />
    </>
  );
};

export default GeneratePI;

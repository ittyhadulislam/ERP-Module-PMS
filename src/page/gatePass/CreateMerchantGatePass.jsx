import React from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import GatePassContainer from "../../components/createMerchantGatePass/GatePassContainet";
import ViewGatePass from "../../components/createMerchantGatePass/ViewGatePass";

const CreateMerchantGatePass = () => {
  return (
    <TabPanel
      tabData={[
        {
          label: "create Gate Pass",
          components: <GatePassContainer />,
        },
        {
          label: "View Details",
          components: <ViewGatePass />,
        },
      ]}
    />
  );
};

export default CreateMerchantGatePass;

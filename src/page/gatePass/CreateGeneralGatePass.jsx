import React from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import GatePassContainer from "../../components/createGeneralGatePass/GatePassContainer";
import ViewGatePass from "../../components/createGeneralGatePass/ViewGatePass";

const CreateGeneralGatePass = () => {
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

export default CreateGeneralGatePass;

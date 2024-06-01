import React from "react";
import EstimateCostingInput from "../../components/merchandising/estimateCosting/EstimateCostingInput";
import TabPanel from "../../components/tabPannel/TabPanel";
import EstimateCostingTab from "../../components/merchandising/estimateCosting/EstimateCostingTab";

const EstimateCosting = () => {
  return (
    <>
      <EstimateCostingInput />
      <TabPanel
        tabData={[
          {
            label: "Estimate Costing",
            components: <EstimateCostingTab />,
          },
          {
            label: "View Edit",
            // components: <ViewAndEdit />,
          },
        ]}
      />
    </>
  );
};

export default EstimateCosting;

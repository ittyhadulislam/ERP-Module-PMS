import React from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import CuttingForApprovalView from "../../components/Cutting/cuttingApproval/CuttingForApprovalView";
import CuttingApprovedView from "../../components/Cutting/cuttingApproval/CuttingApprovedView";

const CuttingApproval = () => {
  return (
    <>
      <TabPanel
        tabData={[
          {
            label: "for approval",
            components: <CuttingForApprovalView />,
          },
          {
            label: "approved",
            components: <CuttingApprovedView />,
          },
        ]}
      />
    </>
  );
};

export default CuttingApproval;

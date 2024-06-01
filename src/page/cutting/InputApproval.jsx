import React from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import InputForApprovalView from "../../components/Cutting/inputApproval/InputForApprovalView";
import InputApprovedView from "../../components/Cutting/inputApproval/InputApprovedView";

const InputApproval = () => {
  return (
    <TabPanel
      tabData={[
        {
          label: "for approval",
          components: <InputForApprovalView />,
        },
        {
          label: "approved",
          components: <InputApprovedView />,
        },
      ]}
    />
  );
};

export default InputApproval;

import React from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import ExportForApproval from "../../components/export/ExportForApproval";
import ExportApproved from "../../components/export/ExportApproved";

const ForApproval = () => {
  return (
    <TabPanel
      tabData={[
        {
          label: "for approval",
          components: <ExportForApproval />,
        },
        {
          label: "approved",
          components: <ExportApproved />,
        },
      ]}
    />
  );
};

export default ForApproval;

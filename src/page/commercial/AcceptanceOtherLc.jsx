import React from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import Approved from "../../components/acceptanceOtherLc/Approved";
import ConfirmToApproval from "../../components/acceptanceOtherLc/ConfirmToApproval";
import ForApproval from "../../components/acceptanceOtherLc/ForApproval";
import NewAcceptanceInput from "../../components/acceptanceOtherLc/newAcceptance/NewAcceptanceInput";

const AcceptanceOtherLc = () => {
  return (
    <>
      <TabPanel
        tabData={[
          {
            label: "new acceptance",
            components: <NewAcceptanceInput />,
          },
          {
            label: "for approval",
            components: <ForApproval />,
          },
          {
            label: "confirmed to approved",
            components: <ConfirmToApproval />,
          },
          {
            label: "approved",
            components: <Approved />,
          },
        ]}
      />
    </>
  );
};

export default AcceptanceOtherLc;

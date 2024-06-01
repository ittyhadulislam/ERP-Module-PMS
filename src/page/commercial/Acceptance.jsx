import React, { useEffect, useState } from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import ForApproval from "../../components/acceptance/ForApproval";
import ConfirmToApproval from "../../components/acceptance/ConfirmToApproval";
import Approved from "../../components/acceptance/Approved";
import NewAcceptanceContainer from "../../components/acceptance/newAcceptance/NewAcceptanceContainer";
import { resetAcceptanceAll } from "../../redux/features/commercial/acceptance/acceptanceSlice";

const Acceptance = () => {
  const dispatch = useDispatch();
  const [goToTab, setGoToTab] = useState(0);

  useEffect(() => {
    if (goToTab) {
      dispatch(resetAcceptanceAll());
    }
  }, [goToTab]);
  return (
    <>
      <TabPanel
        tabData={[
          {
            label: "new acceptance",
            components: <NewAcceptanceContainer />,
          },
          {
            label: "for approval",
            components: <ForApproval setGoToTab={setGoToTab} />,
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
        activeTab={goToTab}
        setActiveTab={setGoToTab}
      />
    </>
  );
};

export default Acceptance;

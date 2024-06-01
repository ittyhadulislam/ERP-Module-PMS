import React from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import PurchaseRequisitionContainer from "../../components/procurement/PurchaseRequisition/PurchaseRequisitionContainer";
import ForConfirmation from "../../components/procurement/ForConfirmation";
import Confirmed from "../../components/procurement/Confirmed";
import Cancelled from "../../components/procurement/Cancelled";

const PurchaseRequisition = () => {
  return (
    <TabPanel
      tabData={[
        {
          label: "Purchase Requisition",
          components: <PurchaseRequisitionContainer />,
        },
        {
          label: "For Confirmation",
          components: <ForConfirmation />,
        },
        {
          label: "Confirmed",
          components: <Confirmed />,
        },
        {
          label: "Cancelled",
          components: <Cancelled />,
        },
      ]}
    />
  );
};

export default PurchaseRequisition;

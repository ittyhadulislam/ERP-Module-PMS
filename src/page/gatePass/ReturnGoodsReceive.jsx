import React from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import GeneralView from "../../components/returnGoodsReceive/GeneralView";
import MerchantView from "../../components/returnGoodsReceive/MerchantView";
import GoodsReceiveContainer from "../../components/returnGoodsReceive/GoodsReceiveContainer";

const ReturnGoodsReceive = () => {
  return (
    <TabPanel
      tabData={[
        {
          label: "Goods Receive Note",
          components: <GoodsReceiveContainer />,
        },
        {
          label: "General View",
          components: <GeneralView />,
        },
        {
          label: "Merchant View",
          components: <MerchantView />,
        },
      ]}
    />
  );
};

export default ReturnGoodsReceive;

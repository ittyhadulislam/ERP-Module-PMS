import React from "react";
import OrderReceivingContainer from "../../components/weaving/orderReceiving/OrderReceivingContainer";
import { Box } from "@mui/material";
import TabPanel from "../../components/tabPannel/TabPanel";
import EditOrderReceivingContainer from "../../components/weaving/orderReceiving/EditOrderReceivingContainer";

const OrderReceiving = () => {
  return (
    <TabPanel
      tabData={[
        { label: "Order Receiving", components: <OrderReceivingContainer /> },
        {
          label: "Edit Order Receiving",
          components: <EditOrderReceivingContainer />,
        },
      ]}
    />
    // <Box
    //   sx={{
    //     border: 1,
    //     borderColor: "#17a2b8",
    //     p: 1,
    //     boxShadow: " 0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
    //   }}
    // >
    // {/* <OrderReceivingContainer /> */}

    // </Box>
  );
};

export default OrderReceiving;

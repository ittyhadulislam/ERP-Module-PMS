import BarcodeForApprovalView from "../../components/Cutting/barcodeApproval/BarcodeForApprovalView";
import BarcodeApprovalview from "../../components/Cutting/barcodeApproval/BarcodeApprovalview";
import TabPanel from "../../components/tabPannel/TabPanel";

const BarCodeApproval = () => {
  return (
    <TabPanel
      tabData={[
        {
          label: "for approval",
          components: <BarcodeForApprovalView />,
        },
        {
          label: "approved",
          components: <BarcodeApprovalview />,
        },
      ]}
    />
  );
};

export default BarCodeApproval;

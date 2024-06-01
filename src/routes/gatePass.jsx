import { lazy } from "react";

const CreateGeneralGatePass = lazy(() =>
  import("../page/gatePass/CreateGeneralGatePass")
);
const CreateMerchantGatePass = lazy(() =>
  import("../page/gatePass/CreateMerchantGatePass")
);
const ForApprovalGeneral = lazy(() =>
  import("../page/gatePass/ForApprovalGeneral")
);
const ForApprovalMerchant = lazy(() =>
  import("../page/gatePass/ForApprovalMerchant")
);
const GeneralReport = lazy(() => import("../page/gatePass/GeneralReport"));
const MerchantReport = lazy(() => import("../page/gatePass/MerchantReport"));
const ReturnGoodsReceive = lazy(() =>
  import("../page/gatePass/ReturnGoodsReceive")
);

export const gatePassRoute = [
  {
    path: "/create-general-gate-pass",
    pageName: "General Gate Pass",
    element: <CreateGeneralGatePass />,
  },
  {
    path: "/create-merchant-gate-pass",
    pageName: "Merchant Gate Pass",
    element: <CreateMerchantGatePass />,
  },
  {
    path: "/for-approval-general",
    pageName: "For Approval General",
    element: <ForApprovalGeneral />,
  },
  {
    path: "/for-approval-merchant",
    pageName: "For Approval merchant",
    element: <ForApprovalMerchant />,
  },
  {
    path: "/return-goods-receive",
    pageName: "Return Goods Receive",
    element: <ReturnGoodsReceive />,
  },
  {
    path: "/report-general",
    pageName: "General Report",
    element: <GeneralReport />,
  },
  {
    path: "/report-merchant",
    pageName: "Merchant Report",
    element: <MerchantReport />,
  },
];

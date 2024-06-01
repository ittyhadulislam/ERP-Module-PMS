import { lazy } from "react";
const StyleMaster = lazy(() => import("../page/merchandising/StyleMaster"));
const EstimateBom = lazy(() => import("../page/merchandising/EstimateBom"));
const EstimateCosting = lazy(() =>
  import("../page/merchandising/EstimateCosting")
);
const EstimateCostingApproval = lazy(() =>
  import("../page/merchandising/EstimateCostingApproval")
);
const SampleCostingApproval = lazy(() =>
  import("../page/merchandising/SampleCostingApproval")
);
const Assortment = lazy(() => import("../page/merchandising/Assortment"));
const BOM = lazy(() => import("../page/merchandising/BOM"));
const OtherBooking = lazy(() => import("../page/merchandising/OtherBooking"));
const POGenerate = lazy(() => import("../page/merchandising/POGenerate"));
const POApproval = lazy(() => import("../page/merchandising/POApproval"));
const CostingComparison = lazy(() =>
  import("../page/merchandising/CostingComparison")
);
const ProformaInvoice = lazy(() =>
  import("../page/merchandising/ProformaInvoice")
);
const OMS = lazy(() => import("../page/merchandising/OMS"));
const StyleStatus = lazy(() => import("../page/merchandising/StyleStatus"));
const StyleTransfer = lazy(() => import("../page/merchandising/StyleTransfer"));
const AssortmentAmend = lazy(() =>
  import("../page/merchandising/AssortmentAmend")
);
const MerchandiserView = lazy(() =>
  import("../page/merchandising/MerchandiserView")
);
const MerchandisingReport = lazy(() =>
  import("../page/merchandising/MerchandisingReport")
);

export const merchandisingRoute = [
  { pageName: "Style Master", path: "/style-master", element: <StyleMaster /> },
  { pageName: "Estimate BOM", path: "/estimate-BOM", element: <EstimateBom /> },
  {
    pageName: "Estimate Costing",
    path: "/estimate-costing",
    element: <EstimateCosting />,
  },
  {
    pageName: "Estimate Costing Approval",
    path: "/estimate-costing-approval",
    element: <EstimateCostingApproval />,
  },
  {
    pageName: "Sample Costing Approval",
    path: "/sample-costing-approval",
    element: <SampleCostingApproval />,
  },
  { pageName: "Assortment", path: "/assortment", element: <Assortment /> },
  { pageName: "BOM", path: "/bom", element: <BOM /> },
  {
    pageName: "Other Booking",
    path: "/other-booking",
    element: <OtherBooking />,
  },
  { pageName: "PO Generate", path: "/po-generate", element: <POGenerate /> },
  { pageName: "PO Approval", path: "/po-approval", element: <POApproval /> },
  {
    pageName: "Costing Comparison",
    path: "/costing-comparison",
    element: <CostingComparison />,
  },
  {
    pageName: "Proforma Invoice",
    path: "/proforma-invoice",
    element: <ProformaInvoice />,
  },
  { pageName: "OMS", path: "/oms", element: <OMS /> },
  { pageName: "Style Status", path: "/style-status", element: <StyleStatus /> },
  {
    pageName: "Style Transfer",
    path: "/style-transfer",
    element: <StyleTransfer />,
  },
  {
    pageName: "Assortment Amend",
    path: "/assortment-amend",
    element: <AssortmentAmend />,
  },
  {
    pageName: "Merchandiser View",
    path: "/merchandiser-view",
    element: <MerchandiserView />,
  },
  {
    pageName: "Merchandising Report",
    path: "/merchandising-report",
    element: <MerchandisingReport />,
  },
];

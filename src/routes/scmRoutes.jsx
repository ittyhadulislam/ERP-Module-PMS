import { lazy } from "react";

const CSForApproval = lazy(() => import("../page/scm/CSForApproval"));
const PriceComparison = lazy(() => import("../page/scm/PriceComparison"));
const SupplierForApproval = lazy(() =>
  import("../page/scm/SupplierForApproval")
);
const SupplierInfo = lazy(() => import("../page/scm/SupplierInfo"));
const MasterSetup = lazy(() => import("../page/scm/MasterSetup"));

export const scmRoutes = [
  {
    path: "/supplier-info",
    pageName: "Supplier Info",
    element: <SupplierInfo />,
  },
  {
    path: "/supplier-for-approval",
    pageName: "Supplier For Approval",
    element: <SupplierForApproval />,
  },
  {
    path: "/price-comparison",
    pageName: "Price Comparison",
    element: <PriceComparison />,
  },
  {
    path: "/cs-for-approval",
    pageName: "CS For Approval",
    element: <CSForApproval />,
  },
  {
    path: "/scm-master-setup",
    pageName: "Scm Master Setup",
    element: <MasterSetup />,
  },
];

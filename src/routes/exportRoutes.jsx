import { lazy } from "react";

const ExportChallanGatePass = lazy(() =>
  import("../page/export/ExportChallanGatePass")
);
const ExportReport = lazy(() => import("../page/export/ExportReport"));
const ForApproval = lazy(() => import("../page/export/ForApproval"));

export const ExportRoutes = [
  {
    path: "/export-challan-gate-pass",
    pageName: "Export Challan Gate Pass",
    element: <ExportChallanGatePass />,
  },
  {
    path: "/for-approval",
    pageName: "For Approval",
    element: <ForApproval />,
  },
  {
    path: "/export-report",
    pageName: "Export Report",
    element: <ExportReport />,
  },
];

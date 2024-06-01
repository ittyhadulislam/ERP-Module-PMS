import { lazy } from "react";

const Finishing = lazy(() => import("../page/finishing/Finishing"));
const FinishingReport = lazy(() => import("../page/finishing/FinishingReport"));
const Packing = lazy(() => import("../page/finishing/Packing"));
const PackingReport = lazy(() => import("../page/finishing/PackingReport"));
const ScanNeedlePassBarcode = lazy(() =>
  import("../page/finishing/ScanNeedlePassBarcode")
);

export const finishingRoutes = [
  {
    path: "/finishing",
    pageName: "Finishing",
    element: <Finishing />,
  },
  {
    path: "/scan-needle-pass-barcode",
    pageName: "Scan Needle Pass Barcode",
    element: <ScanNeedlePassBarcode />,
  },
  {
    path: "/packing",
    pageName: "Packing",
    element: <Packing />,
  },
  {
    path: "/finishing-report",
    pageName: "Finishing Report",
    element: <FinishingReport />,
  },
  {
    path: "/packing-report",
    pageName: "Packing Report",
    element: <PackingReport />,
  },
];

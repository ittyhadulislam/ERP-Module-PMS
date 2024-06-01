import { lazy } from "react";

const CuttingReport = lazy(() =>
  import("../page/productionReport/CuttingReport")
);
const FinishingReport = lazy(() =>
  import("../page/productionReport/FinishingReport")
);
const InputReport = lazy(() => import("../page/productionReport/InputReport"));
const PackingReport = lazy(() =>
  import("../page/productionReport/PackingReport")
);
const SewingReport = lazy(() =>
  import("../page/productionReport/SewingReport")
);

export const productionRoutes = [
  {
    path: "/production-cutting-report",
    pageName: "Cutting Report",
    element: <CuttingReport />,
  },
  {
    path: "/production-input-report",
    pageName: "Input Report",
    element: <InputReport />,
  },
  {
    path: "/production-sewing-report",
    pageName: "Sewing Report",
    element: <SewingReport />,
  },
  {
    path: "/production-finishing-report",
    pageName: "Finishing Report",
    element: <FinishingReport />,
  },
  {
    path: "/production-packing-report",
    pageName: "Packing Report",
    element: <PackingReport />,
  },
];

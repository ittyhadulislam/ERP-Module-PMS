import { lazy } from "react";

const Acceptance = lazy(() => import("../page/commercial/Acceptance"));
const AcceptanceOtherLc = lazy(() =>
  import("../page/commercial/AcceptanceOtherLc")
);
const BackToBackLC = lazy(() => import("../page/commercial/BackToBackLC"));
const CommercialReport = lazy(() =>
  import("../page/commercial/CommercialReport")
);
const Contract = lazy(() => import("../page/commercial/Contract"));
const ExportInvoice = lazy(() => import("../page/commercial/ExportInvoice"));
const ImportInvoiceForeign = lazy(() =>
  import("../page/commercial/ImportInvoiceForeign")
);
const ImportInvoiceLocal = lazy(() =>
  import("../page/commercial/ImportInvoiceLocal")
);
const ImportInvoiceOtherLc = lazy(() =>
  import("../page/commercial/ImportInvoiceOtherLc")
);
const InvoiceSubmission = lazy(() =>
  import("../page/commercial/InvoiceSubmission")
);
const OtherLC = lazy(() => import("../page/commercial/OtherLC"));
const Realization = lazy(() => import("../page/commercial/Realization"));
const MasterSetup = lazy(() => import("../page/commercial/MasterSetup"));

export const commercialRoutes = [
  {
    path: "/contract",
    pageName: "Contract/Master LC",
    element: <Contract />,
  },
  {
    path: "/back-to-back-lc",
    pageName: "Back To Back LC",
    element: <BackToBackLC />,
  },
  {
    path: "/other-lc",
    pageName: "Other LC Opening",
    element: <OtherLC />,
  },
  {
    path: "/import-invoice-foreign",
    pageName: "Create Import Invoice - Foreign",
    element: <ImportInvoiceForeign />,
  },
  {
    path: "/import-invoice-local",
    pageName: "Create Import Invoice - Local",
    element: <ImportInvoiceLocal />,
  },
  {
    path: "/import-invoice-other-lc",
    pageName: "Create Import Invoice - Other",
    element: <ImportInvoiceOtherLc />,
  },
  {
    path: "/acceptance",
    pageName: "Acceptance",
    element: <Acceptance />,
  },
  {
    path: "/acceptance-other-lc",
    pageName: "Acceptance Other LC",
    element: <AcceptanceOtherLc />,
  },
  {
    path: "/export-invoice",
    pageName: "Export Invoice",
    element: <ExportInvoice />,
  },
  {
    path: "/invoice-submission",
    pageName: "Invoice Submission",
    element: <InvoiceSubmission />,
  },
  {
    path: "/realization",
    pageName: "Realization",
    element: <Realization />,
  },
  {
    path: "/commercial-report",
    pageName: "Commercial Report",
    element: <CommercialReport />,
  },
  {
    path: "/commercial-master-setup",
    pageName: "master Setup",
    element: <MasterSetup />,
  },
];

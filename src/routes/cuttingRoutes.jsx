import { lazy } from "react";

const BarCodeApproval = lazy(() => import("../page/cutting/BarCodeApproval"));
const CutMaster = lazy(() => import("../page/cutting/CutMaster"));
const CuttingApproval = lazy(() => import("../page/cutting/CuttingApproval"));
const CuttingLayRatio = lazy(() => import("../page/cutting/CuttingLayRatio"));
const CuttingReport = lazy(() => import("../page/cutting/CuttingReport"));
const FabricClosing = lazy(() => import("../page/cutting/FabricClosing"));
const GenerateBarcode = lazy(() => import("../page/cutting/GenerateBarcode"));
const InputApproval = lazy(() => import("../page/cutting/InputApproval"));
const InputCutPanel = lazy(() => import("../page/cutting/InputCutPanel"));
const InputReport = lazy(() => import("../page/cutting/InputReport"));
const PrintAndEmbroidery = lazy(() =>
  import("../page/cutting/PrintAndEmbroidery")
);
const Template = lazy(() => import("../page/cutting/Template"));

export const cuttingRoutes = [
  { path: "/cut-master", pageName: "Cut master", element: <CutMaster /> },
  {
    path: "/cutting-lay-ratio",
    pageName: "Cutting Lay Ratio",
    element: <CuttingLayRatio />,
  },
  {
    path: "/cutting-approval",
    pageName: "Cutting Approval",
    element: <CuttingApproval />,
  },
  {
    path: "/print-embroidery",
    pageName: "Print And Embroidery",
    element: <PrintAndEmbroidery />,
  },
  {
    path: "/template",
    pageName: "Template",
    element: <Template />,
  },
  {
    path: "/input-cut-panel",
    pageName: "Input Cut Panel",
    element: <InputCutPanel />,
  },
  {
    path: "/generate-barcode",
    pageName: "Generate Barcode",
    element: <GenerateBarcode />,
  },
  {
    path: "/input-approval",
    pageName: "Input Approval",
    element: <InputApproval />,
  },
  {
    path: "/barcode-approval",
    pageName: "Barcode Approval",
    element: <BarCodeApproval />,
  },
  {
    path: "/fabric-closing",
    pageName: "Fabric Closing",
    element: <FabricClosing />,
  },
  {
    path: "/cutting-report",
    pageName: "Cutting Report",
    element: <CuttingReport />,
  },
  {
    path: "/input-report",
    pageName: "Input Report",
    element: <InputReport />,
  },
];

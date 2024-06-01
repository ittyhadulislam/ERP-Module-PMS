import { lazy } from "react";
import PrintNoScanBarcode from "../page/sewing/PrintNoScanBarcode";

const LineDetails = lazy(() => import("../page/sewing/LineDetails"));
const ReworkProcess = lazy(() => import("../page/sewing/ReworkProcess"));
const ScanQCPassBarcode = lazy(() =>
  import("../page/sewing/ScanQCPassBarcode")
);
const SewingProduction = lazy(() => import("../page/sewing/SewingProduction"));
const SMV = lazy(() => import("../page/sewing/SMV"));
const ConvertHourlyProduction = lazy(() =>
  import("../page/sewing/ConvertHourlyProduction")
);
const HourlyProduction = lazy(() => import("../page/sewing/HourlyProduction"));
const SewingReport = lazy(() => import("../page/sewing/SewingReport"));
const Wash = lazy(() => import("../page/sewing/Wash"));

export const sewingRoutes = [
  {
    path: "/line-details",
    pageName: "Line Details",
    element: <LineDetails />,
  },
  {
    path: "/sewing-production",
    pageName: "Sewing Production",
    element: <SewingProduction />,
  },
  {
    path: "/scan-qc-pass-barcode",
    pageName: "Scan QCpass barcode",
    element: <ScanQCPassBarcode />,
  },
  {
    path: "/rework-process",
    pageName: "Rework Process",
    element: <ReworkProcess />,
  },
  {
    path: "/wash",
    pageName: "Wash",
    element: <Wash />,
  },
  {
    path: "/smv",
    pageName: "SMV",
    element: <SMV />,
  },
  {
    path: "/print-no-scan-barcode",
    pageName: "Print No Scan Barcode",
    element: <PrintNoScanBarcode />,
  },
  {
    path: "/convert-hourly-production",
    pageName: "Convert Hourly Production",
    element: <ConvertHourlyProduction />,
  },
  {
    path: "/hourly-production",
    pageName: "Hourly Production",
    element: <HourlyProduction />,
  },
  {
    path: "/sewing-report",
    pageName: "Sewing Report",
    element: <SewingReport />,
  },
];

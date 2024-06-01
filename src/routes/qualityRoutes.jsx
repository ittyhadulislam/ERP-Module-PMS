import { lazy } from "react";

const CreateDefect = lazy(() => import("../page/Quality/CreateDefect"));
const CreateReject = lazy(() => import("../page/Quality/CreateReject"));
const DailyDHUEntry = lazy(() => import("../page/Quality/DailyDHUEntry"));
const DailyRejectionEntry = lazy(() =>
  import("../page/Quality/DailyRejectionEntry")
);
const QualityReport = lazy(() => import("../page/Quality/QualityReport"));

export const qualityRoutes = [
  {
    path: "/create-defect",
    pageName: "Create Defect",
    element: <CreateDefect />,
  },
  {
    path: "/daily-dhu-entry",
    pageName: "Daily DHU Entry",
    element: <DailyDHUEntry />,
  },
  {
    path: "/create-reject",
    pageName: "Create Reject",
    element: <CreateReject />,
  },
  {
    path: "/daily-rejection-entry",
    pageName: "Daily Rejection Entry",
    element: <DailyRejectionEntry />,
  },
  {
    path: "/quality-report",
    pageName: "Quality Report",
    element: <QualityReport />,
  },
];

import { lazy } from "react";

import { cuttingRoutes } from "./cuttingRoutes";
import { ExportRoutes } from "./exportRoutes";
import { finishingRoutes } from "./finishingRoutes";
import { productionRoutes } from "./productionRoutes";
import { qualityRoutes } from "./qualityRoutes";
import { scmRoutes } from "./scmRoutes";
import { sewingRoutes } from "./sewingRoutes";
import { gatePassRoute } from "./gatePass";
import { commercialRoutes } from "./commercialRoutes";
import { merchandisingRoute } from "./merchandisingRoute";
import { procurementRoutes } from "./procurementRoutes";
import { weavingRoute } from "./weavingRoute";
import { assetManagementRoutes } from "./assetManagementRoutes";
const Dashboard = lazy(() => import("../page/Dashboard"));

const MasterSetting = lazy(() => import("../page/MasterSetting"));
export const routes = [
  { path: "/", pageName: "Dashboard", element: <Dashboard /> },

  {
    path: "/master-setting",
    pageName: "Master Setting",
    element: <MasterSetting />,
  },
  ...cuttingRoutes,
  ...sewingRoutes,
  ...finishingRoutes,
  ...ExportRoutes,
  ...productionRoutes,
  ...qualityRoutes,
  ...scmRoutes,
  ...weavingRoute,
  ...gatePassRoute,
  ...commercialRoutes,
  ...merchandisingRoute,
  ...procurementRoutes,
  ...assetManagementRoutes,
];

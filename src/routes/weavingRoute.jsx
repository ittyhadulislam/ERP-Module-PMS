import { lazy } from "react";

// import OrderReceiving from "../page/weaving/OrderReceiving";
const OrderReceiving = lazy(() => import("../page/weaving/OrderReceiving"));
const Costing = lazy(() => import("../page/weaving/Costing"));
const CostingApproval = lazy(() => import("../page/weaving/CostingApproval"));
export const weavingRoute = [
  {
    path: "/order-receiving",
    pageName: "order-receiving",
    element: <OrderReceiving />,
  },
  {
    path: "/costing",
    pageName: "Costing",
    element: <Costing />,
  },
  {
    path: "/costing-approval",
    pageName: "Costing-approval",
    element: <CostingApproval />,
  },
];

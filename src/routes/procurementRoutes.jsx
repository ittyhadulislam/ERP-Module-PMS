import GeneratePI from "../page/procurement/GeneratePI";
import GeneratePo from "../page/procurement/GeneratePo";
import PurchaseRequisition from "../page/procurement/PurchaseRequisition";
import Report from "../page/procurement/Report";

export const procurementRoutes = [
  {
    path: "/purchase-requisition",
    pageName: "purchase Requisition",
    element: <PurchaseRequisition />,
  },
  { path: "/generate-po", pageName: "Generate PO", element: <GeneratePo /> },
  { path: "/purchase-pi", pageName: "Purchase PI", element: <GeneratePI /> },
  { path: "/report", pageName: "Report", element: <Report /> },
];

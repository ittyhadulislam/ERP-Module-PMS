// commonRoutes.js

import NotFound from "../page/NotFound";

export const commonRoutes = [
  { path: "*", pageName: "404", element: <NotFound /> },
];

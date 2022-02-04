import apiRoutes from "./api/mod.ts";
import tablesRoutes from "./tables/mod.ts";

export default [
  ...apiRoutes,
  ...tablesRoutes,
];

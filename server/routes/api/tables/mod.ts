import type { Route } from "../../../utils.ts";
import { handle, setRoute } from "../../../utils.ts";

import nameRoutes from "./[name]/mod.ts";

const routes: Route[] = setRoute(import.meta, [
  handle.post((req, local) => local.meta.post(req.data)),
  handle.get((_, local) => local.meta.getAll()),
]);

export default [
  ...routes,
  ...nameRoutes,
];

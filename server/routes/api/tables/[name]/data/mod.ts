import type { Route } from "../../../../../utils.ts";
import { handle, setRoute } from "../../../../../utils.ts";

import idRoutes from "./[id]/mod.ts";

const routes: Route[] = setRoute(import.meta, [
  handle.post((req, { tables }) => tables.post(req.params.name, req.data)),
  handle.get((req, { tables }) => tables.getAll(req.params.name, req.query)),
]);

export default [
  ...routes,
  ...idRoutes,
];

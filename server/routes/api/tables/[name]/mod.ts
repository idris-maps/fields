import type { Route } from "../../../../utils.ts";
import { handle, setRoute } from "../../../../utils.ts";

import schemaRoutes from "./schema/mod.ts";
import dataRoutes from "./data/mod.ts";

const routes: Route[] = setRoute(import.meta, [
  handle.get((req, { meta }) => meta.getFields(req.params.name)),
  handle.delete((req, { meta }) => meta.delete(req.params.name)),
]);

export default [
  ...routes,
  ...schemaRoutes,
  ...dataRoutes,
];

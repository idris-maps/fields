import type { Route } from "../../../../../utils.ts";
import { handle, setRoute } from "../../../../../utils.ts";

const routes: Route[] = setRoute(import.meta, [
  handle.get((req, { meta }) => meta.getSchema(req.params.name)),
]);

export default routes;

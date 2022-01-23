import type { Route } from "../../../../../../utils.ts";
import { handle, setRoute } from "../../../../../../utils.ts";

const routes: Route[] = setRoute(import.meta, [
  handle.get((req, { tables }) => tables.get(req.params.name, req.params.id)),
  handle.delete((req, { tables }) =>
    tables.delete(req.params.name, req.params.id)
  ),
  handle.patch((req, { tables }) =>
    tables.patch(req.params.name, req.params.id, req.data)
  ),
  handle.put((req, { tables }) =>
    tables.put(req.params.name, req.params.id, req.data)
  ),
]);

export default routes;

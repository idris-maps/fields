import type { Route } from "../../../../../utils.ts";
import { handle, setRoute } from "../../../../../utils.ts";

import idRoutes from "./[id]/mod.ts";

const routes: Route[] = setRoute(import.meta, [
  {
    method: 'POST',
    path: '/',
    handler: async (req, res, { tables }) => {
      const { status, body } = await tables.post(req.params.name, req.data);
      if (status !== 200) { return res.json(status, body) }

      const redirect = req.query.redirect
        ? decodeURIComponent(req.query.redirect)
        : undefined
      console.log({ redirect, q: req.query })
      return redirect
        ? res.redirect(redirect)
        : res.json(200, body)
    },
  },
  handle.get((req, { tables }) => tables.getAll(req.params.name, req.query)),
]);

export default [
  ...routes,
  ...idRoutes,
];

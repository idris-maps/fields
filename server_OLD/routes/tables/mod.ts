import type { Route } from "../../utils.ts";
import { setRoute } from "../../utils.ts";
import { html } from "../../deps.ts";
import { layout } from "../../ui/mod.ts";

import nameRoutes from "./[name]/mod.ts";

const page = (tables: { name: string }[]) =>
  layout(html`
    <ul>
      ${
    tables.map((d) =>
      html`
        <a href="/tables/${d.name}">
          <li>${d.name}</li>
        </a>
      `
    )
  }
    </ul> 
`);

const routes: Route[] = setRoute(import.meta, [
  {
    method: "GET",
    path: "/",
    handler: async (_, res, { meta }) => {
      const { body } = await meta.getAll();
      return res.html(page(body));
    },
  },
]);

export default [
  ...routes,
  ...nameRoutes,
];

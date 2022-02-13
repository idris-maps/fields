import type { Route } from "../../../utils.ts";
import { setRoute } from "../../../utils.ts";
import { html } from "../../../deps.ts";
import { form, layout, table } from "../../../ui/mod.ts";
import type { Field } from "../../../deps.ts";

const getUrl = (tableName: string) =>
  [
    "/api/tables",
    `/${tableName}/data`,
    "?redirect=",
    encodeURIComponent(`/tables/${tableName}`),
  ].join("");

const page = (tableName: string, fields: Field[], data: any[]) =>
  layout(html`
    <main>
      <h1>${tableName}</h1>
      ${table(fields, data)}
      ${form("POST", getUrl(tableName), fields)}
    </main>
`);

const routes: Route[] = setRoute(import.meta, [
  {
    method: "GET",
    path: "/",
    handler: async (req, res, { meta, tables }) => {
      const { status: tablesStatus, body: data } = await tables.getAll(
        req.params.name,
      );
      if (tablesStatus !== 200) return res.status(404);
      const { status: fieldsStatus, body: fields } = await meta.getFields(
        req.params.name,
      );
      if (fieldsStatus !== 200) return res.status(404);
      return res.html(page(req.params.name, fields, data));
    },
  },
]);

export default routes;

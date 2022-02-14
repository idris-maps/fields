/** @jsx h */
import { h } from "../../../deps.ts";
import type { Handler } from "../../../local.ts";
import type { Field } from "../../../deps.ts";
import "../../../types.d.ts";
import Layout from "../../../ui/layout.tsx";
import Table from "../../../ui/table.tsx";
import Form from "../../../ui/form.tsx";

const getAction = (tableName: string) =>
  [
    "/api/tables",
    `/${tableName}/data`,
    "?redirect=",
    encodeURIComponent(`/tables/${tableName}`),
  ].join("");

interface Props {
  tableName: string
  fields: Field[]
  data: any[]
}

const Main = ({ tableName, fields, data }: Props) => (
  <div>
    <Table fields={fields} data={data} />
    <Form method="POST" action={getAction(tableName)} fields={fields} />
  </div>
)

const get: Handler = async (req, res, { tables, meta }) => {
  const { status: tablesStatus, body: data } = await tables.getAll(
    req.params.name,
  );
  if (tablesStatus !== 200) return res.status(404);

  const { status: fieldsStatus, body: fields } = await meta.getFields(
    req.params.name,
  );
  if (fieldsStatus !== 200) return res.status(404);

  return res.jsx(
    <Layout
      header={<h2>{req.params.name}</h2>}
      main={<Main tableName={req.params.name} fields={fields} data={data} />}
    />
  );
}

export default get

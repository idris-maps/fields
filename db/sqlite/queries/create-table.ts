import type { Field } from "../deps.ts";
import type { Sql } from "../mod.ts";

interface Column {
  name: string;
  type: string;
}

const getColumn = (field: Field): Column => {
  if (["number", "range"].includes(field.type)) {
    return { name: field.property, type: "REAL" };
  }
  return { name: field.property, type: "TEXT" };
};

const getColumns = (fields: Field[]) => fields.map(getColumn);

const getQuery = (tableName: string, fields: Field[]) =>
  [
    `CREATE TABLE IF NOT EXISTS ${tableName} (`,
    [
      "__id TEXT PRIMARY KEY",
      ...getColumns(fields).map((d) => d.name + " " + d.type),
    ].join(",\n"),
    ")",
  ].join("\n");

export default async (
  sql: Sql,
  name: string,
  fields: Field[],
) => {
  await sql(getQuery(name, fields));

  return;
};

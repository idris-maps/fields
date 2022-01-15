import type { Field } from "../deps.ts";
import type { Sql } from "../mod.ts";

export default async <T>(
  sql: Sql,
  table: string,
  fields: Field[],
  data: T,
): Promise<T & { __id: string }> => {
  const __id = crypto.randomUUID();
  const query = [
    `INSERT INTO ${table}`,
    `(__id, ${fields.map((d) => d.property).join(", ")})`,
    `VALUES (?, ${fields.map(() => "?").join(", ")})`,
  ].join(" ");

  // @ts-ignore
  const params = [__id, ...fields.map((d) => data[d.property])];

  await sql(query, params);

  return { __id, ...data };
};

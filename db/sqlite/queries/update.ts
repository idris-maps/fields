import type { Sql } from "../mod.ts";
import getById from "./get-by-id.ts";

export default async <T>(
  sql: Sql,
  table: string,
  data: T & { __id: string },
): Promise<T & { __id: string } | undefined> => {
  const { __id, ...next } = data;

  const prev = await getById<T>(sql, table, __id);
  if (!prev) return undefined;

  const fieldsToUpdate = Object.keys(next);
  const query = [
    `UPDATE ${table} SET`,
    fieldsToUpdate.map((d) => `${d} = ?`).join(", "),
    "WHERE __id = ?",
  ].join(" ");

  // @ts-ignore
  const valuesToUpdate = fieldsToUpdate.map((key) => data[key]);

  await sql(query, [...valuesToUpdate, __id]);

  return { ...prev, ...next, __id };
};

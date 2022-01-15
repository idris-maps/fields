import type { Sql } from "../mod.ts";

export default async (
  sql: Sql,
  table: string,
  id: string,
): Promise<void> => {
  const query = `DELETE FROM ${table} WHERE __id = ?`;
  await sql(query, [id]);
  return;
};

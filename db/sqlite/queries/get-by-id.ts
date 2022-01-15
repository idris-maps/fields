import type { Sql } from "../mod.ts";

export default async <T>(
  sql: Sql,
  table: string,
  id: string,
): Promise<T | undefined> => {
  const query = `SELECT * FROM ${table} WHERE __id = ? LIMIT 1`;
  const res = await sql<T[]>(query, [id]);
  return res[0];
};

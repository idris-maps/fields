import type { Sql } from "../mod.ts";
import type { Field } from "../deps.ts";

export const init = async (sql: Sql) => {
  const createTable = `
    CREATE TABLE IF NOT EXISTS __tables (
      name TEXT,
      label TEXT,
      fields TEXT
    )
  `.trim();

  const createIndex = `
    CREATE UNIQUE INDEX IF NOT EXISTS __table_names
    ON __tables (name)
  `.trim();

  await sql(createTable);
  await sql(createIndex);

  return;
};

export const addTable = async (
  sql: Sql,
  name: string,
  label: string,
  fields: Field[],
) => {
  const query = `
    INSERT INTO __tables (name, label, fields)
    VALUES (?, ?, ?)
  `;

  await sql(query, [name, label, JSON.stringify(fields)]);
};

export const getFieldsByTableName = async (
  sql: Sql,
  name: string,
): Promise<Field[] | undefined> => {
  const query = `SELECT fields FROM __tables WHERE name = ?`;

  const res = await sql<{ fields: string }[]>(query, [name]);

  if (!res[0] || !res[0].fields) return undefined;

  try {
    return JSON.parse(res[0].fields);
  } catch {
    return undefined;
  }
};

export const dropTable = async (sql: Sql, name: string) => {
  const query = `DELETE FROM __tables WHERE name = ?`;

  await sql(query, [name]);

  return;
};

export const listTables = async (
  sql: Sql,
): Promise<{ name: string; fields: Field[] }[]> => {
  const query = `SELECT * FROM __tables ORDER BY name`;

  const res = await sql<{ name: string; fields: string }[]>(query);

  // @ts-ignore _
  return res.reduce((r, d) => {
    try {
      return [...r, { name: d.name, fields: JSON.parse(d.fields) }];
    } catch {
      return r;
    }
  }, []);
};

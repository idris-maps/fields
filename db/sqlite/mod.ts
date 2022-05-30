import { DB } from "./deps.ts";
import initTable from "./init-table.ts";
import {
  addTable,
  dropTable,
  getFieldsByTableName,
  getTableByName,
  init,
  listTables,
} from "./queries/meta-table.ts";
import createTable from "./queries/create-table.ts";
import type { FieldsDb } from "../types.d.ts";
import type { Field } from "./deps.ts";

export type Sql = <T>(query: string, params?: unknown[]) => T;

export default async (db: DB): Promise<FieldsDb> => {
  // @ts-ignore RowObject
  const sql: Sql = (query: string, params?: any[]) =>
    db.queryEntries(query, params);

  await init(sql);

  return {
    initTable: async <T>(name: string) => {
      const fields = await getFieldsByTableName(sql, name);
      if (!fields) return undefined;
      return await initTable<T>(sql, name, fields);
    },
    createTable: async (name: string, label: string, fields: Field[]) => {
      const tables = await listTables(sql);
      const exists = tables.map((d) => d.name).includes(name);
      if (exists) return false;

      await createTable(sql, name, fields);
      await addTable(sql, name, label, fields);
      return true;
    },
    dropTable: async (name: string) => await dropTable(sql, name),
    getTableByName: async (name: string) => await getTableByName(sql, name),
    getFieldsByTableName: async (name: string) =>
      await getFieldsByTableName(sql, name),
    listTables: async () => await listTables(sql),
  };
};

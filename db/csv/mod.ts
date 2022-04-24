import type { FieldsDb } from "../types.d.ts";
import type { Field } from "./deps.ts";
import initTables from "./tables.ts";
import { createTable, initTable } from "./table.ts";

export default async (folder: string): Promise<FieldsDb> => {
  const tables = await initTables(folder);

  return {
    initTable: async <T>(name: string) => {
      const fields = await tables.getFieldsByTableName(name);
      if (!fields) return undefined;
      return initTable<T>(folder, name, fields);
    },
    createTable: async (name: string, label: string, fields: Field[]) => {
      const exists = Boolean(await tables.getFieldsByTableName(name));
      if (exists) return false;
      await tables.add(name, label, fields);
      return createTable(folder, name, fields);
    },
    dropTable: tables.drop,
    getFieldsByTableName: tables.getFieldsByTableName,
    listTables: () => tables.list(),
  };
};

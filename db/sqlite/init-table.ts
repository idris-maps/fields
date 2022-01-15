import { castRequest, castResponse } from "./cast.ts";
import queries from "./queries/index.ts";
import type { Sql } from "./mod.ts";
import type { Field } from "./deps.ts";
import type { FieldsDbTable } from "../types.d.ts";
import type { Filter } from "../filters.ts";

const {
  createTable,
  get,
  getById,
  insert,
  remove,
  update,
} = queries;

export default <T>(
  sql: Sql,
  name: string,
  fields: Field[],
): Promise<FieldsDbTable<T>> =>
  Promise.resolve({
    name,
    fields,
    get: async (filters?: Filter[]) =>
      (await get(sql, name, filters)).map((d) => castResponse(fields, d)),
    getById: async (id: string) =>
      castResponse(fields, await getById(sql, name, id)),
    insert: async (d: T) =>
      castResponse(
        fields,
        await insert<T>(sql, name, fields, castRequest(fields, d)),
      ),
    remove: (id: string) => remove(sql, name, id),
    update: async (d: Partial<T> & { __id: string }) =>
      castResponse(fields, await update(sql, name, castRequest(fields, d))),
  });

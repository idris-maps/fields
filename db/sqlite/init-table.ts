import { castRequest, castResponse } from "./cast.ts";
import queries from "./queries/index.ts";
import type { Sql } from "./mod.ts";
import type { Field, Filter } from "./deps.ts";
import type { FieldsDbTable, FieldsTableSort } from "../types.d.ts";

const {
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
    get: async (
      filters?: Filter[],
      sort?: FieldsTableSort,
      limit?: number,
      offset?: number,
    ) =>
      (await get(sql, name, filters, sort, limit, offset)).map((d) =>
        castResponse(fields, d)
      ),
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

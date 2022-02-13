import type { FieldsDb } from "./deps.ts";
import type { FieldsTableHandlers } from "./types.d.ts";
import getHelpers from "./table-helpers.ts";

const getTable = async (db: FieldsDb, name: string) => {
  const table = await db.initTable(name);
  return table ? { ...table, ...getHelpers(table.fields) } : undefined;
};

export const initTableHandlers = (db: FieldsDb): FieldsTableHandlers => ({
  getAll: async (name, query = {}) => {
    const table = await getTable(db, name);
    if (!table) return { status: 404 };

    const filters = table.getFilters(query);
    const sort = table.getSort(query)
    return { status: 200, body: await table.get(filters, sort) };
  },
  get: async (name, id) => {
    const table = await getTable(db, name);
    if (!table) return { status: 404 };

    const body = await table.getById(id);
    return body ? { status: 200, body } : { status: 404 };
  },
  patch: async (name, id, data) => {
    const table = await getTable(db, name);
    if (!table) return { status: 404 };

    const prev = await table.getById(id);
    if (!prev) return { status: 404 };

    const next = table.sanitize(data);
    const { isValid, messages } = table.validatePartial(next);
    if (!isValid) return { status: 400, body: { errors: messages || [] } };

    return { status: 200, body: await table.update({ __id: id, ...next }) };
  },
  post: async (name, data) => {
    const table = await getTable(db, name);
    if (!table) return { status: 404 };

    const next = table.sanitize(data);
    const { isValid, messages } = table.validate(next);
    if (!isValid) return { status: 400, body: { errors: messages || [] } };

    return { status: 200, body: await table.insert(next) };
  },
  put: async (name, id, data) => {
    const table = await getTable(db, name);
    if (!table) return { status: 404 };

    const prev = await table.getById(id);
    if (!prev) return { status: 404 };

    const next = table.sanitize(data);
    const { isValid, messages } = table.validate(next);
    if (!isValid) return { status: 400, body: { errors: messages || [] } };

    return { status: 200, body: await table.update({ __id: id, ...next }) };
  },
  delete: async (name, id) => {
    const table = await getTable(db, name);
    if (!table) return { status: 404 };

    await table.remove(id);
    return { status: 204 };
  },
});

export default initTableHandlers;

import type { FieldsDb } from "./deps.ts";
import type { FieldsHandlers } from "./types.d.ts";
import getHelpers from "./helpers.ts";

interface Props {
  name: string;
  db: FieldsDb;
}

export const initTableHandlers = async (
  { name, db }: Props,
): Promise<FieldsHandlers> => {
  const table = await db.initTable(name);
  if (!table) throw new Error(`Table: ${name} does not exist`);

  const { getFilters, sanitize, validate, validatePartial } = getHelpers(
    table.fields,
  );

  return {
    getAll: async (query = {}) => {
      const filters = getFilters(query);
      return { status: 200, body: await table.get(filters) };
    },
    get: async (id) => {
      const body = await table.getById(id);
      return body ? { status: 200, body } : { status: 404 };
    },
    patch: async (id, data) => {
      const prev = await table.getById(id);
      if (!prev) return { status: 404 };
      const next = sanitize(data);
      const { isValid, messages } = validatePartial(next);
      if (!isValid) return { status: 400, body: { errors: messages || [] } };
      return { status: 200, body: await table.update({ __id: id, ...next }) };
    },
    post: async (data) => {
      const next = sanitize(data);
      const { isValid, messages } = validate(next);
      if (!isValid) return { status: 400, body: { errors: messages || [] } };
      return { status: 200, body: await table.insert(next) };
    },
    put: async (id, data) => {
      const prev = await table.getById(id);
      if (!prev) return { status: 404 };
      const next = sanitize(data);
      const { isValid, messages } = validate(next);
      if (!isValid) return { status: 400, body: { errors: messages || [] } };
      return { status: 200, body: await table.update({ __id: id, ...next }) };
    },
    delete: async (id) => {
      await table.remove(id);
      return { status: 204 };
    },
  };
};

export default initTableHandlers;

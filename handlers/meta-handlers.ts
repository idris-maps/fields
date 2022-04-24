import type { FieldsDb } from "./deps.ts";
import type { FieldsMetaHandlers } from "./types.d.ts";
import {
  isString,
  toJsonSchema,
  validateFields,
  validateTableName,
} from "./deps.ts";

const ERR = {
  missingName: "name is not defined",
  nameNotAlphaNum:
    "name may only contain alpha numeric characters and _ (underscore)",
  nameLength: "name may not be less than 3 characters",
  nameUnderscore: "name may not start with _ (underscore)",
  tableExists: "table already exists",
};

const metaHandlers = (db: FieldsDb): FieldsMetaHandlers => ({
  post: async (data: any) => {
    const { name, label: _label, fields } = data;

    const nameValidation = validateTableName(name);
    if (!nameValidation.isValid) {
      return { status: 400, body: { errors: nameValidation.errors || [] } };
    }

    const { isValid, messages } = validateFields(fields);
    if (!isValid) {
      return { status: 400, body: { errors: messages || [] } };
    }

    const label = _label === String(_label) && _label.trim() !== ""
      ? _label
      : name;

    const created = await db.createTable(name, label, fields);
    return created
      ? { status: 200, body: { created: true } }
      : { status: 400, body: { errors: [ERR.tableExists] } };
  },
  getAll: async () => {
    const tables = await db.listTables();
    return { status: 200, body: tables };
  },
  getFields: async (name: string) => {
    if (!isString(name) || name.trim() === "") {
      return { status: 404 };
    }

    const fields = await db.getFieldsByTableName(name);
    return fields ? { status: 200, body: fields } : { status: 404 };
  },
  getSchema: async (name: string) => {
    if (!isString(name) || name.trim() === "") {
      return { status: 404 };
    }

    const fields = await db.getFieldsByTableName(name);
    return fields
      ? { status: 200, body: toJsonSchema(fields) }
      : { status: 404 };
  },
  delete: async (name: string) => {
    if (!isString(name) || name.trim() === "") {
      return { status: 404 };
    }

    await db.dropTable(name);
    return { status: 204 };
  },
});

export default metaHandlers;

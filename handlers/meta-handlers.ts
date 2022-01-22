import type { Field, FieldsDb } from "./deps.ts";
import type { FieldsMetaHandlers } from "./types.d.ts";
import {
  isAlphaNumOrUnderscore,
  isString,
  toJsonSchema,
  validateFields,
} from "./deps.ts";

const ERR = {
  nameNotAlphaNum:
    'name may only contain alpha numeric characters and "_" (underscore)',
  nameLength: "name may not be less than 3 characters",
  nameUnderscore: 'name may not start with "_" (underscore)',
  tableExists: "table already exists",
};

const getNameError = (name: any) => {
  if (!isString(name) || !isAlphaNumOrUnderscore(name)) {
    return ERR.nameNotAlphaNum;
  }
  if (name.length <= 3) {
    return ERR.nameLength;
  }
  if (name.startsWith("_")) {
    return ERR.nameUnderscore;
  }
  return undefined;
};

interface Props {
  db: FieldsDb;
}

const metaHandlers = ({ db }: Props): FieldsMetaHandlers => ({
  post: async (name: string, fields: any) => {
    if (getNameError(name)) {
      return { status: 400, body: { error: getNameError(name) } };
    }

    const { isValid, messages } = validateFields(fields);
    if (!isValid) {
      return { status: 400, body: { errors: messages } };
    }

    const created = await db.createTable(name, fields);
    return created
      ? { status: 200, body: { created: true } }
      : { status: 400, body: { error: ERR.tableExists } };
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

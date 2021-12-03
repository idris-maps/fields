import { Field } from "../types.ts";
import toSchema from "./to-json-schema.ts";

const getKeys = (fields: Field[]) => {
  const schema = toSchema(fields);
  const properties = schema?.properties || {};
  const required = schema?.required || [];
  return Object.keys(properties)
    .map((prop) => {
      const definition = properties[prop];
      // @ts-ignore
      const type = definition["type"] || "any";
      const req = Boolean(required.find((d: string) => d === prop));
      return `${prop}${req ? "?" : ""}: ${type}`;
    });
};

export default (fields: Field[], table: string = "Table") =>
  [
    `export interface ${table} {`,
    ...getKeys(fields).map((d) => `  ${d}`),
    "}",
  ].join("\n");

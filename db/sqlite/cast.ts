import type { Field } from "../deps.ts";

export const castResponse = <T = any>(fields: Field[], values: any): T => {
  if (!values) return values;
  const booleanFields = fields.filter((d) => d.type === "checkbox");
  if (!booleanFields.length) return values;

  const booleanFieldsInValues = booleanFields.filter((d) =>
    Object.keys(values).includes(d.property)
  );

  return booleanFieldsInValues.reduce((r, { property }) => ({
    ...r,
    [property]: r[property] === "true",
  }), values);
};

export const castRequest = <T = any>(fields: Field[], values: any): T => {
  const booleanFields = fields.filter((d) => d.type === "checkbox");
  if (!booleanFields.length) return values;

  const booleanFieldsInValues = booleanFields.filter((d) =>
    Object.keys(values).includes(d.property)
  );

  return booleanFieldsInValues.reduce((r, { property }) => ({
    ...r,
    [property]: r[property] ? "true" : "false",
  }), values);
};

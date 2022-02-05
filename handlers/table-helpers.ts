import type { Field } from "./deps.ts";
import {
  isCheckbox,
  isNumericField,
  isUndefined,
  validateValues,
  parseQueryFilters,
} from "./deps.ts";

const setUndefinedBooleansToFalse = (booleanFields: string[], data: any) =>
  booleanFields.reduce(
    (data, key) => data[key] ? data : { ...data, [key]: false },
    data,
  );

const initSanitizer = (fields: Field[]) => {
  const existingFields = fields.map((d) => d.property);
  const numericFields = fields.filter(isNumericField).map((d) => d.property);
  const booleanFields = fields.filter(isCheckbox).map((d) => d.property);
  const defaultValues = fields.reduce(
    (r, d) => isUndefined(d.value) ? r : ({ ...r, [d.property]: d.value }),
    {},
  );

  return (data: any): any =>
    Object.entries(setUndefinedBooleansToFalse(booleanFields, data))
      .reduce((r, [key, value]) => {
        if (numericFields.includes(key)) {
          return { ...r, [key]: Number(value) };
        }
        if (booleanFields.includes(key)) {
          return { ...r, [key]: ["true", "on", "1"].includes(String(value)) };
        }
        if (existingFields.includes(key)) {
          return { ...r, [key]: value };
        }
        return r;
      }, defaultValues);
};

const isField = (d: Field | undefined): d is Field => Boolean(d);

export default (fields: Field[]) => ({
  getFilters: parseQueryFilters(fields),
  sanitize: initSanitizer(fields),
  validate: (data: any) => validateValues(fields, data),
  validatePartial: (data: any) =>
    validateValues(
      Object.keys(data)
        .map((key) => fields.find((d) => d.property === key))
        .filter(isField),
      data,
    ),
});

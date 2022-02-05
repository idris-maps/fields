import type { Field, Filter } from "./deps.ts";
import {
  isCheckbox,
  isNumericField,
  isUndefined,
  validateValues,
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

const isPlace = (d?: string): d is "start" | "end" | "contains" =>
  Boolean(d) && ["start", "end", "contains"].includes(String(d));

const parseFilter = (
  key: string,
  value: string,
  isColumn: (d: string) => boolean,
): Filter | undefined => {
  const [column, op, place] = key.split(".");

  if (!isColumn(column)) return undefined;

  switch (op) {
    case "eq":
      return { column, op: "eq", value };
    case "in":
      return { column, op: "in", values: value.split(",") };
    case "like":
      return isPlace(place) ? { column, op: "like", place, value } : undefined;
    case "notEq":
      return { column, op: "notEq", value };
    case "notIn":
      return { column, op: "notIn", values: value.split(",") };
    case "notLike":
      return isPlace(place)
        ? { column, op: "notLike", place, value }
        : undefined;
    case "gt":
      return { column, op: "gt", value };
    case "gte":
      return { column, op: "gte", value };
    case "lt":
      return { column, op: "lt", value };
    case "lte":
      return { column, op: "lte", value };
    default:
      return undefined;
  }
};

const parseFilters = (fields: Field[]) => {
  const columns = fields.map((d) => d.property);
  const isColumn = (d: string) => columns.includes(d);

  return (data: { [key: string]: string }) =>
    Object.keys(data)
      .reduce((filtering: Filter[], key: string): Filter[] => {
        const value = data[key];
        if (!value || value.trim() === "") return filtering;
        const filter = parseFilter(key, value, isColumn);
        return filter ? [...filtering, filter] : filtering;
      }, []);
};

export default (fields: Field[]) => ({
  getFilters: parseFilters(fields),
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

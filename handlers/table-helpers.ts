import type { Field } from "./deps.ts";
import { initSanitizer, parseQueryFilters, validateValues } from "./deps.ts";

const isField = (d: Field | undefined): d is Field => Boolean(d);

const getSort = (fields: Field[], query: { [key: string]: string }) => {
  if (query.sort) {
    const [column, direction] = query.sort.split(".");
    const columnExists = Boolean(fields.find((d) => d.property === column));
    return columnExists ? { column, desc: direction === "desc" } : undefined;
  }
  return undefined;
};

const getQueryNum = (
  fields: Field[],
  query: { [key: string]: string },
  key: string,
) => {
  if (!query[key]) return undefined;
  const keyIsColumn = Boolean(fields.find((d) => d.property === key));
  if (keyIsColumn) return undefined;
  const val = Number(query[key]);
  return Number.isNaN(val) ? undefined : val;
};

const getTableSelect = (fields: Field[]) =>
  (query: { [key: string]: string }) => ({
    sort: getSort(fields, query),
    limit: getQueryNum(fields, query, "limit"),
    offset: getQueryNum(fields, query, "offset"),
  });

export default (fields: Field[]) => ({
  getFilters: parseQueryFilters(fields),
  getSelect: getTableSelect(fields),
  sanitize: initSanitizer(fields).sanitizeAndAddDefault,
  validate: (data: any) => validateValues(fields, data),
  validatePartial: (data: any) =>
    validateValues(
      Object.keys(data)
        .map((key) => fields.find((d) => d.property === key))
        .filter(isField),
      data,
    ),
});

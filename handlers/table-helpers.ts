import type { Field } from "./deps.ts";
import { initSanitizer, parseQueryFilters, validateValues } from "./deps.ts";

const isField = (d: Field | undefined): d is Field => Boolean(d);

const getSort = (fields: Field[]) => (query: { [key: string]: string }) => {
  if (query.sort) {
    const [column, direction] = query.sort.split('.')
    const columnExists = Boolean(fields.find(d => d.property === column))
    return columnExists ? { column, asc: direction === 'asc' } : undefined
  }
  return undefined
}

export default (fields: Field[]) => ({
  getFilters: parseQueryFilters(fields),
  getSort: getSort(fields),
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

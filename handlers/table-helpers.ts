import type { Field } from "./deps.ts";
import { initSanitizer, parseQueryFilters, validateValues } from "./deps.ts";

const isField = (d: Field | undefined): d is Field => Boolean(d);

export default (fields: Field[]) => ({
  getFilters: parseQueryFilters(fields),
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

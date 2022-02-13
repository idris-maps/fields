import type { Field } from "./deps.ts";
import { isCheckbox, isNumericField, isUndefined } from "./deps.ts";

const getDefaultValues = (fields: Field[]): any =>
  fields.reduce(
    (r, d) =>
      isUndefined(d.value)
        ? d.type === "checkbox" ? ({ ...r, [d.property]: false }) : r
        : ({ ...r, [d.property]: d.value }),
    {},
  );

const sanitizeOne = (
  existingKeys: string[],
  numericKeys: string[],
  booleanKeys: string[],
) =>
  (key: string, value: any) => {
    if (numericKeys.includes(key)) {
      return Number(value);
    }
    if (booleanKeys.includes(key)) {
      return ["true", "on", "1"].includes(String(value));
    }
    if (existingKeys.includes(key)) {
      return value;
    }
    return undefined;
  };

const sanitizeAll = (
  sanitizeValue: (key: string, value: any) => any,
) =>
  (data: any) =>
    Object.entries(data)
      .reduce((r, [key, value]) => {
        const val = sanitizeValue(key, value);
        return isUndefined(val) ? r : { ...r, [key]: val };
      }, {});

const getKeys = (fields: Field[]) =>
  fields.reduce(
    ([exitingKeys, numericKeys, booleanKeys]: string[][], d: Field) => {
      exitingKeys.push(d.property);
      if (isNumericField(d)) numericKeys.push(d.property);
      if (isCheckbox(d)) booleanKeys.push(d.property);
      return [exitingKeys, numericKeys, booleanKeys];
    },
    [[], [], []],
  );

export default (fields: Field[]) => {
  const [existingKeys, numericKeys, booleanKeys] = getKeys(fields);
  const sanitizeValue = sanitizeOne(existingKeys, numericKeys, booleanKeys);
  const sanitizeObject = sanitizeAll(sanitizeValue);
  const defaultValues = getDefaultValues(fields);

  return {
    sanitizeValue,
    sanitizeObject,
    sanitizeAndAddDefault: (data: any) => ({
      ...defaultValues,
      ...sanitizeObject(data),
    }),
  };
};

import { Field, SelectOption } from "./deps.ts";
import {
  isAlphaNumOrUnderscore,
  isBoolean,
  isNum,
  isString,
  startsWithNum,
} from "./utils.ts";

const ERR = {
  noProperty: "all fields must have a property",
  propertyAlphaNum:
    "property may only contain alpha numeric characters and _ (underscore)",
  propertyStartsWithUnderscore: "property may not start with _ (underscore)",
  propertyStartsWithNumber: "property may not start with a number",
  noType: "all fields must have a valid type",
  noOptions:
    "options must be an array of strings or { label: string, value: string }[]",
  notString: (d: string) => `${d} must be a string`,
  notNum: (d: string) => `${d} must be a number`,
  notBoolean: (d: string) => `${d} must be boolean`,
  uniqProp: "fields must have uniq properties",
  invalidKeys: (d: string[]) => `invalid keys: ${d.join(", ")}`,
};

const isOption = (d: any): d is SelectOption | string => (
  d &&
  (
    isString(d) ||
    (d.label && d.value && isString(d.label) && isString(d.value))
  )
);

const areOptions = (d?: any): d is Array<SelectOption | string> => (
  Array.isArray(d) &&
  d.every(isOption)
);

const assertIfDefined = (
  assertion: (d: any) => boolean,
  msg: (k: string) => string,
) =>
  (key: string, obj: any) => {
    if (obj && obj[key]) {
      if (!assertion(obj[key])) {
        throw msg(key);
      }
    }
    return undefined;
  };

const assertStringIfDefined = assertIfDefined(isString, ERR.notString);
const assertNumberIfDefined = assertIfDefined(isNum, ERR.notNum);
const assertBooleanIfDefined = assertIfDefined(isBoolean, ERR.notBoolean);

const stringTypes = [
  "color",
  "date",
  "email",
  "password",
  "tel",
  "text",
  "textarea",
];
const numTypes = [
  "number",
  "range",
];
const optionTypes = [
  "select",
  "radio",
];

const validKeys = [
  "label",
  "max",
  "maxLength",
  "min",
  "minLength",
  "notRequired",
  "options",
  "pattern",
  "placeholder",
  "property",
  "step",
  "type",
  "value",
];

const getInvalidKeys = (obj: any) =>
  Object.keys(obj)
    .filter((d) => !validKeys.includes(d));

export const isField = (field: any): field is Field => {
  if (!field.property) throw ERR.noProperty;
  if (!isString(field.property) || !isAlphaNumOrUnderscore(field.property)) {
    throw ERR.propertyAlphaNum;
  }
  if (field.property.startsWith("_")) throw ERR.propertyStartsWithUnderscore;
  if (startsWithNum(field.property)) throw ERR.propertyStartsWithNumber;

  if (!field.type) throw ERR.noType;

  if (stringTypes.includes(field.type)) {
    assertStringIfDefined("value", field);
  } else if (numTypes.includes(field.type)) {
    assertNumberIfDefined("value", field);
  } else if (field.type === "checkbox") {
    assertBooleanIfDefined("value", field);
  } else if (optionTypes.includes(field.type)) {
    if (!areOptions(field.options)) throw ERR.noOptions;
  } else {
    throw ERR.noType;
  }

  assertStringIfDefined("label", field);
  assertStringIfDefined("pattern", field);
  assertStringIfDefined("placeholder", field);

  assertNumberIfDefined("maxLength", field);
  assertNumberIfDefined("minLength", field);
  assertNumberIfDefined("min", field);
  assertNumberIfDefined("max", field);
  assertNumberIfDefined("step", field);

  assertBooleanIfDefined("notRequired", field);

  if (getInvalidKeys(field).length) {
    throw ERR.invalidKeys(getInvalidKeys(field));
  }

  return true;
};

export const validateFields = (fields: any) => {
  if (!Array.isArray(fields)) {
    return { isValid: false, messages: ["fields must be an array"] };
  }

  if (!fields.length) {
    return { isValid: false, messages: ["fields may not be empty"] };
  }

  let messages: string[] = [];
  fields.forEach((d, i) => {
    try {
      isField(d);
    } catch (err) {
      messages.push(`fields[${i}]: ${err}`);
    }
  });

  return messages.length === 0
    ? { isValid: true }
    : { isValid: false, messages };
};

export const areFields = (d: any): d is Field[] => {
  const { messages } = validateFields(d);
  if (messages && messages.length > 0) {
    throw `Invalid fields:\n${messages.join("\n  -")}`;
  }
  return true;
};

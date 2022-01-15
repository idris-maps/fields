import { Field, SelectOption } from "./deps.ts";
import { isBoolean, isNum, isString } from "./utils.ts";

const ERR = {
  noProperty: "all fields must have a property",
  noType: "all fields must have a valid type",
  noOptions:
    "options must be an array of string or { label: string, value: string }",
  notString: (d: string) => `${d} must be a string`,
  notNum: (d: string) => `${d} must be a number`,
  notBoolean: (d: string) => `${d} must be boolean`,
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
    if (obj && obj[key] && assertion(obj[key])) {
      return undefined;
    }
    throw msg(key);
  };

const assertStringIfDefined = assertIfDefined(isString, ERR.notString);
const assertNumberIfDefined = assertIfDefined(isNum, ERR.notNum);
const assertBooleanIfDefined = assertIfDefined(isBoolean, ERR.notBoolean);

export const isField = (field: any): field is Field => {
  if (!field.property) throw ERR.noProperty;
  if (!field.type) throw ERR.noType;

  if (
    ["color", "date", "email", "password", "tel", "text", "textarea"].includes(
      field.type,
    )
  ) {
    assertStringIfDefined("value", field);
  } else if (["number", "range"].includes(field.type)) {
    assertNumberIfDefined("value", field);
  } else if (field.type === "checkbox") {
    assertBooleanIfDefined("value", field);
  } else if (["select", "radio"].includes(field.type)) {
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

  return true;
};

export const validateFields = (fields: any) => {
  if (!Array.isArray(fields)) {
    return { isValid: false, messages: ["fields must be an array"] };
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

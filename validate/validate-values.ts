import {
  Field,
  isCheckbox,
  isColor,
  isDate,
  isEnumField,
  isEnumString,
  isNumericField,
  isTextarea,
  isTextField,
  SelectOption,
} from "../types.ts";
import {
  fitsPattern,
  isAlphaNum,
  isBoolean,
  isDateString,
  isMultipleOf,
  isNum,
  isString,
  isUndefined,
} from "./utils.ts";

export interface ValueValidation {
  isValid: boolean;
  message?: string;
}

export interface ObjectValidation {
  isValid: boolean;
  messages?: string[];
}

const MSG = {
  notFieldType: `not a valid field type`,
  notBoolean: (prop: string) => `${prop} must be boolean`,
  notEnum: (prop: string, values: string[]) =>
    `${prop} must be one of ${values.join(",")}`,
  notColor: (prop: string) => `${prop} must be a hex color`,
  notDate: (prop: string) => `${prop} must be a date in the yyyy-mm-dd format`,
  notString: (prop: string) => `${prop} must be a string`,
  tooLong: (prop: string, max: number) =>
    `${prop} is too long (max length: ${max})`,
  tooShort: (prop: string, min: number) =>
    `${prop} is too short (min length ${min})`,
  notPattern: (prop: string, pattern: string) =>
    `${prop} does not fit pattern: ${pattern}`,
  notNum: (prop: string) => `${prop} must be a number`,
  tooSmall: (prop: string, min: number) => `${prop} is too small (min: ${min})`,
  tooBig: (prop: string, max: number) => `${prop} is too big (max: ${max})`,
  notMultiple: (prop: string, step: number) =>
    `${prop} must be a multiple of ${step}`,
};

const assert = (isValid: boolean, message: string): ValueValidation =>
  isValid ? { isValid } : { isValid, message };

const getEnumOptions = (opt: SelectOption[] | string[]) =>
  opt.map((d) => isEnumString(d) ? d : d.value);

export const validateValue = (field: Field, value: any): ValueValidation => {
  if (isEnumField(field)) {
    const values = getEnumOptions(field.options);
    return assert(
      values.includes(value),
      MSG.notEnum(field.property, values),
    );
  }

  if (isCheckbox(field)) {
    return assert(
      isBoolean(value),
      MSG.notBoolean(field.property),
    );
  }

  if (field.notRequired && isUndefined(value)) {
    return { isValid: true };
  }

  if (isColor(field)) {
    return assert(
      isString(value) &&
        (value.length === 4 || 7) &&
        value.startsWith("#") &&
        isAlphaNum(value.substring(1)),
      MSG.notColor(field.property),
    );
  }

  if (isDate(field)) {
    return assert(
      isString(value) &&
        isDateString(value),
      MSG.notDate(field.property),
    );
  }

  if (isTextarea(field)) {
    return assert(
      isString(value),
      MSG.notString(field.property),
    );
  }

  if (isTextField(field)) {
    if (!isString(value)) {
      return { isValid: false, message: MSG.notString(field.property) };
    }

    if (field.maxLength && value.length > field.maxLength) {
      return {
        isValid: false,
        message: MSG.tooLong(field.property, field.maxLength),
      };
    }

    if (field.minLength && value.length < field.minLength) {
      return {
        isValid: false,
        message: MSG.tooLong(field.property, field.minLength),
      };
    }

    if (field.pattern && !fitsPattern(field.pattern, value)) {
      return {
        isValid: false,
        message: MSG.notPattern(field.property, field.pattern),
      };
    }

    return { isValid: true };
  }

  if (isNumericField(field)) {
    if (!isNum(value)) {
      return { isValid: false, message: MSG.notNum(field.property) };
    }

    if (field.min && value < field.min) {
      return {
        isValid: false,
        message: MSG.tooSmall(field.property, field.min),
      };
    }

    if (field.max && value < field.max) {
      return { isValid: false, message: MSG.tooBig(field.property, field.max) };
    }

    if (field.step && !isMultipleOf(field.step, value)) {
      return {
        isValid: false,
        message: MSG.notMultiple(field.property, field.step),
      };
    }

    return { isValid: true };
  }

  return { isValid: false, message: MSG.notFieldType };
};

export const validateValues = (
  fields: Field[],
  data: any,
): ObjectValidation => {
  const validations = fields.map((field) =>
    validateValue(field, data[field.property])
  );

  if (validations.every((d) => d.isValid)) {
    return { isValid: true };
  }

  return {
    isValid: false,
    messages: validations.reduce((r: string[], d) => {
      if (d.message) return [...r, d.message];
      return r;
    }, []),
  };
};

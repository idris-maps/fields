import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { validateValue } from "./validate-values.ts";
import type {
  Checkbox,
  Color,
  Date,
  EnumField,
  NumericField,
  Textarea,
  TextField,
} from "./deps.ts";

// asserts

const isEq = assertEquals;
const isTrue = (d: unknown, msg?: string) => assertEquals(d, true, msg);
const isFalse = (d: unknown, msg?: string) => assertEquals(d, false, msg);

Deno.test("[validateValue] enum", () => {
  const field1: EnumField = {
    type: "select",
    property: "prop",
    options: ["one", "two"],
  };
  isTrue(validateValue(field1, "one").isValid);
  isFalse(validateValue(field1, "three").isValid);
  isEq(
    validateValue(field1, "three").message,
    "prop must be one of one,two",
  );

  const field2: EnumField = {
    type: "radio",
    property: "prop",
    options: [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
    ],
  };
  isTrue(validateValue(field2, "one").isValid);
  isFalse(validateValue(field2, "three").isValid);
  isEq(
    validateValue(field2, "three").message,
    "prop must be one of one,two",
  );
});

Deno.test("[validateValue] checkbox", () => {
  const field: Checkbox = {
    type: "checkbox",
    property: "prop",
  };

  isTrue(validateValue(field, true).isValid);
  isTrue(validateValue(field, false).isValid);
  isTrue(validateValue(field, "true").isValid);
  isTrue(validateValue(field, "false").isValid);
  isFalse(validateValue(field, "no").isValid);
  isEq(
    validateValue(field, "no").message,
    "prop must be boolean",
  );
  isFalse(validateValue(field, 1).isValid);
  isEq(
    validateValue(field, 1).message,
    "prop must be boolean",
  );
});

Deno.test("[validateValue] color", () => {
  const field: Color = {
    type: "color",
    property: "prop",
  };

  isTrue(validateValue(field, "#000").isValid);
  isTrue(validateValue(field, "#000000").isValid);
  isFalse(validateValue(field, undefined).isValid);
  isTrue(validateValue({ ...field, notRequired: true }, undefined).isValid);
  isFalse(validateValue(field, "not-a-color").isValid);
});

Deno.test("[validateValue] date", () => {
  const field: Date = {
    type: "date",
    property: "prop",
    max: "2020-01-01",
    min: "2000-01-01",
  };

  isTrue(validateValue(field, "2010-01-01").isValid);
  isTrue(validateValue({ ...field, notRequired: true }, undefined).isValid);
  isFalse(validateValue(field, undefined).isValid);
  const notADate = validateValue(field, "not-a-date");
  isFalse(notADate.isValid);
  isEq(notADate.message, "prop must be a date in the yyyy-mm-dd format");
  const tooEarly = validateValue(field, "1999-01-01");
  isFalse(tooEarly.isValid);
  isEq(tooEarly.message, "prop is too early (min: 2000-01-01)");
  const tooLate = validateValue(field, "2021-01-01");
  isFalse(tooLate.isValid);
  isEq(tooLate.message, "prop is too late (max: 2020-01-01)");
});

Deno.test("[validateValue] textarea", () => {
  const field: Textarea = {
    type: "textarea",
    property: "prop",
  };

  isTrue(validateValue(field, "hello").isValid);
  isTrue(validateValue(field, "").isValid);
  isFalse(validateValue(field, 1).isValid);
  isFalse(validateValue(field, undefined).isValid);
  isTrue(validateValue({ ...field, notRequired: true }, undefined).isValid);
});

Deno.test("[validateValue] text field", () => {
  const field: TextField = {
    type: "text",
    property: "prop",
    maxLength: 10,
    minLength: 2,
    pattern: "[a-z]",
  };

  isTrue(validateValue(field, "hello").isValid);
  isFalse(validateValue(field, 1).isValid);
  isFalse(validateValue(field, undefined).isValid);
  isTrue(validateValue({ ...field, notRequired: true }, undefined).isValid);
  const tooLong = validateValue(field, "tooooooooooo long");
  isFalse(tooLong.isValid);
  isEq(tooLong.message, "prop is too long (max length: 10)");
  const tooShort = validateValue(field, "a");
  isFalse(tooShort.isValid);
  isEq(tooShort.message, "prop is too long (max length: 2)");
  const wrongPattern = validateValue(field, "111");
  isFalse(wrongPattern.isValid);
  isEq(wrongPattern.message, "prop does not fit pattern: [a-z]");
});

Deno.test("[validateValue] numeric field", () => {
  const field: NumericField = {
    type: "number",
    property: "prop",
    max: 10,
    min: 1,
    step: 0.05,
  };

  isTrue(validateValue(field, 2).isValid);
  isFalse(validateValue(field, "hello").isValid);
  isTrue(validateValue({ ...field, notRequired: true }, undefined).isValid);
  isFalse(validateValue(field, undefined).isValid);
  const tooSmall = validateValue(field, 0.55);
  const tooBig = validateValue(field, 12);
  const wrongStep = validateValue(field, 1.03);
  isFalse(tooSmall.isValid);
  isEq(tooSmall.message, "prop is too small (min: 1)");
  isFalse(tooBig.isValid);
  isEq(tooBig.message, "prop is too big (max: 10)");
  isFalse(wrongStep.isValid);
  isEq(wrongStep.message, "prop must be a multiple of 0.05");
});

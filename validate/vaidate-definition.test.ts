import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { validateFields } from "./validate-definition.ts";

const field = {
  type: "text",
  minLength: 2,
  property: "test",
};

// asserts

const isEq = assertEquals;
const isTrue = (d: unknown, msg?: string) => assertEquals(d, true, msg);
const isFalse = (d: unknown, msg?: string) => assertEquals(d, false, msg);

Deno.test("[validateFields] property", () => {
  isTrue(validateFields([field]).isValid);
  isFalse(validateFields([{ ...field, property: "" }]).isValid);
  isFalse(validateFields([{ ...field, property: undefined }]).isValid);
  isFalse(validateFields([{ ...field, property: "héllö" }]).isValid);
});

Deno.test("[validateFields] type", () => {
  isFalse(validateFields([{ ...field, type: "not-a-type" }]).isValid);
});

Deno.test("[validateFields] value", () => {
  isTrue(validateFields([{ ...field, value: "hello" }]).isValid);
  isTrue(validateFields([{ ...field, type: "number", value: 3 }]).isValid);
  isTrue(validateFields([{ ...field, type: "checkbox", value: true }]).isValid);
  isFalse(validateFields([{ ...field, value: 3 }]).isValid);
  isFalse(
    validateFields([{ ...field, type: "number", value: "hello" }]).isValid,
  );
  isFalse(validateFields([{ ...field, type: "checkbox", value: 3 }]).isValid);
});

Deno.test("[validateFields] other keys", () => {
  isTrue(validateFields([{ ...field, step: 3 }]).isValid);
  isTrue(validateFields([{ ...field, placeholder: "hello" }]).isValid);
  isTrue(validateFields([{ ...field, notRequired: true }]).isValid);
  isFalse(validateFields([{ ...field, step: "hello" }]).isValid);
  isFalse(validateFields([{ ...field, placeholder: 3 }]).isValid);
  isFalse(validateFields([{ ...field, notRequired: "hello" }]).isValid);
  isFalse(validateFields([{ ...field, notValid: "key" }]).isValid);
});

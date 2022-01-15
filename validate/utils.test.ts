import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import {
  fitsPattern,
  isAlphaNum,
  isAlphaNumLetter,
  isBoolean,
  isDateString,
  isMultipleOf,
  isNum,
  isString,
  isUndefined,
} from "./utils.ts";

// asserts

const isTrue = (d: unknown, msg?: string) => assertEquals(d, true, msg);
const isFalse = (d: unknown, msg?: string) => assertEquals(d, false, msg);

Deno.test("[validate utils] isAlphaNum", () => {
  isTrue(isAlphaNum("abcd1"));
  isFalse(isAlphaNum("äbcd1"));
});

Deno.test("[validate utils] isAlphaNumLetter", () => {
  isTrue(isAlphaNumLetter("a"));
  isTrue(isAlphaNumLetter("1"));
  isFalse(isAlphaNumLetter("ä"));
});

Deno.test("[validate utils] isBoolean", () => {
  isTrue(isBoolean(true));
  isTrue(isBoolean(false));
  isTrue(isBoolean("true"));
  isTrue(isBoolean("false"));
  isFalse(isBoolean(1));
  isFalse(isBoolean("hello"));
  isFalse(isBoolean(undefined));
});

Deno.test("[validate utils] isDateString", () => {
  isTrue(isDateString("2000-01-01"));
  isFalse(isDateString("2000-01"));
  isFalse(isDateString("2000"));
  isFalse(isDateString("01"));
  isFalse(isDateString("01-01"));
  isFalse(isDateString("2000-13-01"));
  isFalse(isDateString("2000-13-32"));
  isFalse(isDateString("00-01-01"));
});

Deno.test("[validate utils] isMultipleOf", () => {
  isTrue(isMultipleOf(1, 2));
  isTrue(isMultipleOf(5, 10));
  isTrue(isMultipleOf(0.1, 0.2));
  isTrue(isMultipleOf(0.5, 1));
  isTrue(isMultipleOf(0.01, 0.02));
  isTrue(isMultipleOf(0.05, 0.1));
  isTrue(isMultipleOf(0.001, 0.002));
  isTrue(isMultipleOf(0.005, 0.01));
  isTrue(isMultipleOf(0.0001, 0.0002));
  isTrue(isMultipleOf(0.0005, 0.001));
  isFalse(isMultipleOf(2, 1));
  isFalse(isMultipleOf(10, 5));
  isTrue(isMultipleOf(0.05, 2));
});

Deno.test("[validate utils] isNum", () => {
  isTrue(isNum(1));
  isTrue(isNum(0.1));
  isTrue(isNum(10));
  isFalse(isNum(false));
  isFalse(isNum("hello"));
  isFalse(isNum("1"));
  isFalse(isNum(""));
  isFalse(isNum(undefined));
  isFalse(isNum({ a: 1 }));
  isFalse(isNum([]));
});

Deno.test("[validate utils] isString", () => {
  isTrue(isString("hello"));
  isTrue(isString(""));
  isFalse(isString(undefined));
  isFalse(isString(true));
  isFalse(isString(1));
  isFalse(isString({ a: 1 }));
  isFalse(isString([]));
});

Deno.test("[validate utils] isUndefined", () => {
  isTrue(isUndefined(undefined));
  isFalse(isUndefined(false));
  isFalse(isUndefined(null));
  isFalse(isUndefined(""));
  isFalse(isUndefined(1));
  isFalse(isUndefined({ a: 1 }));
  isFalse(isUndefined([]));
});

Deno.test("[validate utils] fitsPattern", () => {
  const pattern = "[0-9]{3}";
  isTrue(fitsPattern(pattern, "123"));
  isFalse(fitsPattern(pattern, "12"));
  isFalse(fitsPattern(pattern, "abc"));
});

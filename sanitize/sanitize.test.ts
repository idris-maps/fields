import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import init from "./sanitize.ts";

const { sanitizeValue, sanitizeObject, sanitizeAndAddDefault } = init([
  { type: "checkbox", property: "bool", value: true },
  { type: "number", property: "num", value: 2, max: 3 },
  { type: "text", property: "txt", value: "hello", maxLength: 6 },
]);

Deno.test("[sanitizeValue] boolean", () => {
  assertEquals(sanitizeValue("bool", true), true, "should be true when true");
  assertEquals(
    sanitizeValue("bool", "true"),
    true,
    'should be true when "true"',
  );
  assertEquals(sanitizeValue("bool", "on"), true, 'should be true when "on"');
  assertEquals(
    sanitizeValue("bool", "any_string"),
    false,
    'should be false when "any_string"',
  );
  assertEquals(
    sanitizeValue("bool", false),
    false,
    "should be false, when false",
  );
});

Deno.test("[sanitizeValue] numeric", () => {
  assertEquals(sanitizeValue("num", 3), 3);
  assertEquals(sanitizeValue("num", "3"), 3);
  assertEquals(sanitizeValue("num", "hello"), NaN);
});

Deno.test("[sanitizeValue] not exist", () => {
  assertEquals(sanitizeValue("not_a_key", "hello"), undefined);
});

Deno.test("[sanitizeObject]", () => {
  assertEquals(sanitizeObject({ hello: "world" }), {});
  assertEquals(sanitizeObject({ bool: "on", num: "2" }), {
    bool: true,
    num: 2,
  });
  assertEquals(sanitizeObject({ num: "2" }), { num: 2 });
  assertEquals(sanitizeObject({ bool: false }), { bool: false });
});

Deno.test("[sanitizeAndAddDefaultValues]", () => {
  assertEquals(
    sanitizeAndAddDefault({}),
    { bool: true, num: 2, txt: "hello" },
  );
  assertEquals(
    sanitizeAndAddDefault({ bool: false }),
    { bool: false, num: 2, txt: "hello" },
  );
  assertEquals(
    sanitizeAndAddDefault({ bool: true, num: "3", other: "stuff" }),
    { bool: true, num: 3, txt: "hello" },
  );
});

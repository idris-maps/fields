import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import initTableHandlers from "./mod.ts";
import initDb from "../db/sqlite/mod.ts";
import { DB } from './deps.ts'
import type { Field } from "./deps.ts";

// setup

const db = await initDb(new DB(":memory:"));
const fields: Field[] = [
  { type: "checkbox", property: "done" },
  { type: "text", property: "todo", maxLength: 10, minLength: 2 },
  { type: "number", property: "num" },
];
const name = "todos";
const label = "label";
await db.createTable(name, label, fields);
const handlers = initTableHandlers(db).tables;
const DATA = {
  ok: { done: false, todo: "todo", num: 1 },
  toSanitize: { done: "false", todo: "todo", num: "1" },
};

// asserts

const isEq = assertEquals;
const isTrue = (d: unknown, msg?: string) => assertEquals(d, true, msg);
const isFalse = (d: unknown, msg?: string) => assertEquals(d, false, msg);
const isTruthy = (d: unknown, msg?: string) =>
  assertEquals(Boolean(d), true, msg);
const isFalsy = (d: unknown, msg?: string) =>
  assertEquals(Boolean(d), true, msg);
const hasExpectedKeys = (expectedKeys: string[], obj: any, msg?: string) => {
  const keys = Object.keys(obj);
  isTrue(keys.every((d) => expectedKeys.includes(d)), msg);
};

await Deno.test("[Handlers] should return 404 if table does not exist", async () => {
  isEq((await handlers.delete("not_a_table", "_id")).status, 404);
  isEq((await handlers.get("not_a_table", "_id")).status, 404);
  isEq((await handlers.getAll("not_a_table")).status, 404);
  isEq((await handlers.patch("not_a_table", "_id", {})).status, 404);
  isEq((await handlers.post("not_a_table", {})).status, 404);
  isEq((await handlers.put("not_a_table", "_id", {})).status, 404);
});

await Deno.test("[Handlers] has expected keys", () => {
  hasExpectedKeys(
    ["getAll", "get", "patch", "post", "put", "delete"],
    handlers,
  );
});

await Deno.test("[Handlers .post] should sanitize and generate an __id", async () => {
  const { status, body } = await handlers.post(name, DATA.toSanitize);
  isEq(status, 200);
  isEq(body?.num, 1);
  isFalse(body?.done);
  isTruthy(body.__id);
});

await Deno.test("[Handlers .post] should validate", async () => {
  const { status, body } = await handlers.post(name, {
    ...DATA.ok,
    todo: "toooooooooooo long",
  });
  isEq(status, 400);
  isEq(body?.errors[0], "todo is too long (max length: 10)");
});

const create = async (d: any = {}): Promise<string> =>
  (await handlers.post(name, { ...DATA.ok, ...d })).body?.__id;

await Deno.test("[Handlers .put] should return 404 if not exists", async () => {
  const { status } = await handlers.put(name, crypto.randomUUID(), DATA.ok);
  isEq(status, 404);
});

await Deno.test("[Handlers .put] should sanitize", async () => {
  const id = await create();
  const { status, body } = await handlers.put(name, id, DATA.toSanitize);
  isEq(status, 200);
  isEq(body?.num, 1);
  isFalse(body?.done);
  isTruthy(body.__id);
});

await Deno.test("[Handlers .put] should validate", async () => {
  const id = await create();
  const { status, body } = await handlers.put(name, id, {
    ...DATA.ok,
    todo: undefined,
  });
  isEq(status, 400);
  isEq(body?.errors[0], "todo must be a string");
});

await Deno.test("[Handlers .put] should update", async () => {
  const UPDATED = "updated";
  const id = await create();
  const { status, body } = await handlers.put(name, id, {
    ...DATA.ok,
    todo: UPDATED,
  });
  isEq(status, 200);
  isEq(body?.todo, UPDATED);
});

await Deno.test("[Handlers .patch] should return 404 if not exists", async () => {
  const { status } = await handlers.patch(name, crypto.randomUUID(), DATA.ok);
  isEq(status, 404);
});

await Deno.test("[Handlers .patch] should sanitize", async () => {
  const id = await create();
  const { status, body } = await handlers.patch(name, id, DATA.toSanitize);

  isEq(status, 200);
  isEq(body?.num, 1);
  isFalse(body?.done);
  isTruthy(body.__id);
});

await Deno.test("[Handlers .patch] should validate", async () => {
  const id = await create();
  const { status, body } = await handlers.patch(name, id, {
    todo: "tooooooooo long",
  });
  isEq(status, 400);
  isEq(body?.errors[0], "todo is too long (max length: 10)");
});

await Deno.test("[Handlers .patch] should update", async () => {
  const UPDATED = "updated";
  const id = await create();
  const { status, body } = await handlers.patch(name, id, { todo: UPDATED });
  isEq(status, 200);
  isEq(body?.todo, UPDATED);
});

await Deno.test("[Handlers .get] should return 404 if not exists", async () => {
  const { status } = await handlers.get(name, crypto.randomUUID());
  isEq(status, 404);
});

await Deno.test("[Handlers .get] should return datum", async () => {
  const id = await create();
  const { status, body } = await handlers.get(name, id);
  isEq(status, 200);
  isEq(body?.__id, id);
  isEq(body?.done, DATA.ok.done);
  isEq(body?.num, DATA.ok.num);
  isEq(body?.todo, DATA.ok.todo);
});

await Deno.test("[Handlers .delete] should delete datum", async () => {
  const id = await create();
  const { status } = await handlers.delete(name, id);
  isEq(status, 204);
  isFalsy(await handlers.get(name, id));
});

await Deno.test("[Handlers .getAll] should return an array", async () => {
  await create();
  const { status, body } = await handlers.getAll(name);
  isEq(status, 200);
  isTrue(Array.isArray(body));
});

const clearTable = async () => {
  const ids: string[] = (await handlers.getAll(name)).body.map((d: any) =>
    d.__id
  );
  return Promise.all(ids.map((d) => handlers.delete(name, d)));
};

await Deno.test("[Handlers .getAll] should return all entries", async () => {
  await clearTable();
  const one = await create();
  const two = await create();
  const { status, body } = await handlers.getAll(name);
  isEq(status, 200);
  const ids = body.map((d: any) => d.__id);
  isEq(ids.length, 2);
  isTrue(ids.includes(one));
  isTrue(ids.includes(two));
});

await Deno.test('[Handlers .getAll] should filter "eq" / "notEq"', async () => {
  await clearTable();
  await create({ todo: "aaa" });
  await create({ todo: "bbb" });

  const eq = await handlers.getAll(name, { "todo.eq": "aaa" });
  isEq(eq.status, 200);
  isEq(eq.body.length, 1);
  isEq(eq.body[0].todo, "aaa");

  const notEq = await handlers.getAll(name, { "todo.notEq": "aaa" });
  isEq(notEq.status, 200);
  isEq(notEq.body.length, 1);
  isEq(notEq.body[0].todo, "bbb");
});

await Deno.test('[Handlers .getAll] should filter "in" / "notIn"', async () => {
  await clearTable();
  await create({ todo: "aaa" });
  await create({ todo: "bbb" });
  await create({ todo: "ccc" });

  const _in = await handlers.getAll(name, { "todo.in": "aaa,bbb" });
  isEq(_in.status, 200);
  isEq(_in.body.length, 2);
  const todosIn = _in.body.map((d: any) => d.todo);
  isTrue(todosIn.includes("aaa"));
  isTrue(todosIn.includes("bbb"));
  isFalse(todosIn.includes("ccc"));

  const notIn = await handlers.getAll(name, { "todo.notIn": "aaa,bbb" });
  isEq(notIn.status, 200);
  isEq(notIn.body.length, 1);
  const todosNotIn = notIn.body.map((d: any) => d.todo);
  isFalse(todosNotIn.includes("aaa"));
  isFalse(todosNotIn.includes("bbb"));
  isTrue(todosNotIn.includes("ccc"));

  const combined = await handlers.getAll(name, {
    "todo.in": "aaa",
    "todo.notIn": "aaa,bbb",
  });
  isEq(combined.status, 200);
  isEq(combined.body.length, 0);
});

await Deno.test('[Handlers .getAll] should filter "gt/gte/lt/lte"', async () => {
  await clearTable();
  await create({ todo: "aaa" });
  await create({ todo: "bbb" });
  await create({ todo: "ccc" });

  const gt = await handlers.getAll(name, { "todo.gt": "bbb" });
  isEq(gt.status, 200);
  const todosGt = gt.body.map((d: any) => d.todo);
  isFalse(todosGt.includes("aaa"));
  isFalse(todosGt.includes("bbb"));
  isTrue(todosGt.includes("ccc"));

  const gte = await handlers.getAll(name, { "todo.gte": "bbb" });
  isEq(gte.status, 200);
  const todosGte = gte.body.map((d: any) => d.todo);
  isFalse(todosGte.includes("aaa"));
  isTrue(todosGte.includes("bbb"));
  isTrue(todosGte.includes("ccc"));

  const lt = await handlers.getAll(name, { "todo.lt": "bbb" });
  isEq(lt.status, 200);
  const todosLt = lt.body.map((d: any) => d.todo);
  isTrue(todosLt.includes("aaa"));
  isFalse(todosLt.includes("bbb"));
  isFalse(todosLt.includes("ccc"));

  const lte = await handlers.getAll(name, { "todo.lte": "bbb" });
  isEq(lte.status, 200);
  const todosLte = lte.body.map((d: any) => d.todo);
  isTrue(todosLte.includes("aaa"));
  isTrue(todosLte.includes("bbb"));
  isFalse(todosLte.includes("ccc"));
});

await Deno.test('[Handlers .getAll] should sort / limit / offset"', async () => {
  await clearTable();
  await Promise.all(
    Array.from(Array(10)).map((_, i) => create({ num: i + 1 })),
  );

  const sort = await handlers.getAll(name, { sort: "num" });
  const sortDesc = await handlers.getAll(name, { sort: "num.asc" });
  isEq(sort.body, sortDesc.body);
  isEq(sort.body[0].num, 1);
  isEq(sort.body[9].num, 10);

  const sortAsc = await handlers.getAll(name, { sort: "num.desc" });
  isEq(sortAsc.body[0].num, 10);
  isEq(sortAsc.body[9].num, 1);

  const first5 = await handlers.getAll(name, { sort: "num", limit: "5" });
  isEq(first5.body.length, 5);
  isEq(first5.body[4].num, 5);

  const next5 = await handlers.getAll(name, {
    sort: "num",
    limit: "5",
    offset: "5",
  });
  isEq(next5.body.length, 5);
  isEq(next5.body[4].num, 10);
});

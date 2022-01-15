import { assertEquals } from "./deps.ts";
import type { FieldsDb } from "./types.d.ts";
import type { Field } from "./deps.ts";

const todoFields: Field[] = [
  { type: "checkbox", property: "done" },
  { type: "text", property: "todo" },
  { type: "number", property: "num" },
];

interface Todo {
  done: boolean;
  todo: string;
  num: number;
}

const isEq = assertEquals;
const isTrue = (d: unknown, msg?: string) => assertEquals(d, true, msg);
const isTruthy = (d: unknown, msg?: string) =>
  assertEquals(Boolean(d), true, msg);
const isFalse = (d: unknown, msg?: string) => assertEquals(d, false, msg);
const isFalsy = (d: unknown, msg?: string) =>
  assertEquals(Boolean(d), false, msg);
const hasExpectedKeys = (expectedKeys: string[], obj: any, msg?: string) => {
  const keys = Object.keys(obj);
  isTrue(keys.every((d) => expectedKeys.includes(d)), msg);
};

export default async (name: string, db: FieldsDb) => {
  await Deno.test(`[DB connector ${name}]`, () => {
    hasExpectedKeys(
      [
        "initTable",
        "createTable",
        "dropTable",
        "getFieldsByTableName",
        "listTables",
      ],
      db,
      "should have expected keys",
    );
  });

  await Deno.test(`[DB connector ${name}] create and init table`, async () => {
    const tableName = "test_table_1";
    const created = await db.createTable(tableName, todoFields);
    isTrue(created, "should create a new table");

    const duplicate = await db.createTable(tableName, todoFields);
    isFalse(duplicate, "create should not duplicate tables");

    const existing = db.initTable(tableName);
    hasExpectedKeys(
      [
        "name",
        "fields",
        "get",
        "getById",
        "insert",
        "remove",
        "update",
      ],
      existing,
      "should initialise existing table",
    );

    const notExisting = await db.initTable("not-exist");
    isFalsy(
      notExisting,
      "init should return undefined if table does not exist",
    );
  });

  await Deno.test(`[DB connector ${name}] table`, async () => {
    const tableName = "todos";
    await db.createTable(tableName, todoFields);
    const table = await db.initTable<Todo>(tableName);
    if (!table) throw "table was not initialised";

    const data = { todo: "todo", done: false, num: 1 };

    const inserted = await table.insert(data);
    const { __id: insertedId, ...insertRest } = inserted;
    isTruthy(insertedId, "insert should add __id");
    isEq(insertRest, data, "insert should return data");

    const byId = await table.getById(insertedId);
    isEq(byId, inserted, "getById should return row if exists");

    isFalsy(
      await table.getById("not-exist"),
      "getById should return undefined if not exist",
    );

    const second = await table.insert({ todo: "todo-2", done: true, num: 2 });

    const all = await table.get();
    const allIds = all.map((d) => d.__id);
    isTrue(
      allIds.includes(insertedId) && allIds.includes(second.__id),
      "get should return all rows",
    );
    isEq(all.find((d) => d.__id === second.__id), second);
    isEq(all.find((d) => d.__id === insertedId), inserted);

    const getEqString = await table.get([{
      column: "todo",
      op: "eq",
      value: data.todo,
    }]);
    isTrue(
      getEqString.every((d) => d.todo === data.todo),
      "get with eq filter on string",
    );

    const getEqBoolean = await table.get([{
      column: "done",
      op: "eq",
      value: "false",
    }]);
    isTrue(getEqBoolean.every((d) => !d.done), "get with eq filter on boolean");

    const getEqNumber = await table.get([{
      column: "num",
      op: "eq",
      value: String(data.num),
    }]);
    isTrue(
      getEqNumber.every((d) => d.num === data.num),
      "get with eq filter on number",
    );

    const getNotEq = await table.get([{
      column: "todo",
      op: "notEq",
      value: data.todo,
    }]);
    isFalse(
      getNotEq.some((d) => d.todo === data.todo),
      "get with notEq filter",
    );

    const _in = [data.todo, second.todo];
    const getIn = await table.get([{ column: "todo", op: "in", values: _in }]);
    isTrue(getIn.every((d) => _in.includes(d.todo)), "get with in filter");

    const notIn = [data.todo];
    const getNotIn = await table.get([{
      column: "todo",
      op: "notIn",
      values: notIn,
    }]);
    isFalse(
      getNotIn.some((d) => notIn.includes(d.todo)),
      "get with notIn filter",
    );

    const contains = data.todo.slice(1, 3);
    const getLikeContains = await table.get([{
      column: "todo",
      op: "like",
      value: contains,
      place: "contains",
    }]);
    isTrue(
      getLikeContains.every((d) => d.todo.includes(contains)),
      "get with like (contains) filter",
    );

    const start = data.todo.slice(0, 3);
    const getLikeStart = await table.get([{
      column: "todo",
      op: "like",
      value: start,
      place: "start",
    }]);
    isTrue(
      getLikeStart.every((d) => d.todo.startsWith(start)),
      "get with like (start) filter",
    );

    const end = data.todo.slice(data.todo.length - 3, data.todo.length);
    const getLikeEnd = await table.get([{
      column: "todo",
      op: "like",
      value: end,
      place: "end",
    }]);
    isTrue(
      getLikeEnd.every((d) => d.todo.endsWith(end)),
      "get with like (end) filter",
    );

    const getGt = await table.get([{
      column: "num",
      op: "gt",
      value: "1",
    }]);
    isEq(getGt, all.filter((d) => d.num > 1), "get with gt filter");

    const getGte = await table.get([{
      column: "num",
      op: "gte",
      value: "1",
    }]);
    isEq(getGte, all.filter((d) => d.num >= 1), "get with gte filter");

    const getLt = await table.get([{
      column: "num",
      op: "lt",
      value: "2",
    }]);
    isEq(getLt, all.filter((d) => d.num < 2), "get with lt filter");

    const getLte = await table.get([{
      column: "num",
      op: "lte",
      value: "2",
    }]);
    isEq(getLte, all.filter((d) => d.num <= 2), "get with lte filter");

    await table.update({ ...inserted, num: 3 });
    const updatedNum = await table.getById(inserted.__id);
    isEq(updatedNum?.num, 3, "update number");

    await table.update({ ...inserted, todo: "foooo" });
    const updatedStr = await table.getById(inserted.__id);
    isEq(updatedStr?.todo, "foooo", "update string");

    await table.update({ ...inserted, done: !inserted.done });
    const updatedBool = await table.getById(inserted.__id);
    isEq(updatedBool?.done, !inserted.done, "update boolean");

    await table.remove(inserted.__id);
    const afterRemove = await table.get();
    isFalse(afterRemove.map((d) => d.__id).includes(inserted.__id));
  });

  await Deno.test(`[DB connector ${name}]: listTables`, async () => {
    const tables = await db.listTables();
    isTrue(tables.map((d) => d.name).includes("todos"));
    isEq(tables[0].fields, todoFields);
  });

  await Deno.test(`[DB connector ${name}]: getFieldsByTableName`, async () => {
    isEq(await db.getFieldsByTableName("todos"), todoFields);
    isFalsy(await db.getFieldsByTableName("not-a-table"));
  });

  await Deno.test(`[DB connector ${name}]: dropTable`, async () => {
    await db.dropTable("todos");
    isFalse((await db.listTables()).map((d) => d.name).includes("todos"));
  });
};

import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { DB } from './deps.ts'
import type { Field } from "./deps.ts";
import type { FieldsDbTable } from "../types.d.ts";

import initDb from "./mod.ts";
const db = await initDb(new DB(":memory:"));

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

Deno.test("[sqlite connector] db should have expected keys", () => {
  hasExpectedKeys(
    [
      "initTable",
      "createTable",
      "dropTable",
      "getFieldsByTableName",
      "getTableByName",
      "listTables",
    ],
    db,
    "should have expected keys",
  );
});

Deno.test("[sqlite connector] create and init table", async () => {
  const tableName = "test_table_1";
  const tableLabel = "Test table 1";
  const created = await db.createTable(tableName, tableLabel, todoFields);
  isTrue(created, "should create a new table");

  const duplicate = await db.createTable(tableName, tableLabel, todoFields);
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

Deno.test("[sqlite connector] db.initTable", async () => {
  const tableName = "todos";
  const tableLabel = "Todos";
  await db.createTable(tableName, tableLabel, todoFields);
  const table = await db.initTable<Todo>(tableName);
  isTruthy(table, "should init table");
});

const getTable = async (): Promise<FieldsDbTable<Todo>> => {
  const tableName = "todos";
  const tableLabel = "Todos";
  await db.createTable(tableName, tableLabel, todoFields);
  const table = await db.initTable<Todo>(tableName);
  if (!table) {
    throw "no table";
  }
  return table;
};

Deno.test("[sqlite connector] table.insert", async () => {
  const table = await getTable();
  const data = { todo: "todo", done: false, num: 1 };

  const inserted = await table.insert(data);
  const { __id: insertedId, ...insertRest } = inserted;
  isTruthy(insertedId, "insert should add __id");
  isEq(insertRest, data, "insert should return data");
});

Deno.test("[sqlite connector] table.getById", async () => {
  const table = await getTable();
  const data = { todo: "todo", done: false, num: 1 };
  const inserted = await table.insert(data);

  const byId = await table.getById(inserted.__id);
  isEq(byId, inserted, "getById should return row if exists");

  isFalsy(
    await table.getById("not-exist"),
    "getById should return undefined if not exist",
  );
});

Deno.test("[sqlite connector] table.get", async () => {
  const table = await getTable();
  const data = { todo: "todo", done: false, num: 1 };
  const one = await table.insert(data);
  const two = await table.insert({ ...data, num: 2 });

  const all = await table.get();
  const allIds = all.map((d) => d.__id);
  isTrue(
    allIds.includes(one.__id) && allIds.includes(two.__id),
    "get should return all rows",
  );
  isEq(all.find((d) => d.__id === one.__id), one);
  isEq(all.find((d) => d.__id === two.__id), two);
});

Deno.test("[sqlite connector] table.get eq", async () => {
  const table = await getTable();
  const data = { todo: "todo", done: false, num: 1 };

  await table.insert({ ...data, todo: "is-eq", num: 1 });
  await table.insert({ ...data, todo: "is-not-eq", num: 2 });

  const getEq_str = await table.get([{
    column: "todo",
    op: "eq",
    value: "is-eq",
  }]);
  isTrue(
    getEq_str.every((d) => d.todo === "is-eq"),
    "get with eq filter on string",
  );

  const getNotEq_str = await table.get([{
    column: "todo",
    op: "notEq",
    value: "is-eq",
  }]);
  isTrue(
    getNotEq_str.every((d) => d.todo !== "is-eq"),
    "get with notEq filter on string",
  );

  const getEq_num = await table.get([{
    column: "num",
    op: "eq",
    value: "1",
  }]);
  isTrue(
    getEq_num.every((d) => d.num === 1),
    "get with eq filter on number",
  );

  const getNotEq_num = await table.get([{
    column: "num",
    op: "notEq",
    value: "1",
  }]);

  isTrue(
    getNotEq_num.every((d) => d.num !== 1),
    "get with notEq filter on number",
  );
});

Deno.test("[sqlite connector] table.get in / notIn", async () => {
  const table = await getTable();
  const data = { todo: "todo", done: false, num: 1 };
  const one = await table.insert(data);
  const two = await table.insert({ ...data, num: 2 });
  const three = await table.insert({ ...data, num: 3 });

  const getIn = await table.get([{
    column: "num",
    op: "in",
    values: ["2", "3"],
  }]);
  isTrue(
    getIn.every((d) => [2, 3].includes(d.num)),
    "[in] should only return rows with value in",
  );
  const getInIds = getIn.map((d) => d.__id);
  isTrue(
    getInIds.includes(two.__id),
    "[in] should return inserted row with value",
  );
  isTrue(
    getInIds.includes(three.__id),
    "[in] should return inserted row with value",
  );
  isFalse(
    getInIds.includes(one.__id),
    "[in] should not return inserted row with wrong value",
  );

  const getNotIn = await table.get([{
    column: "num",
    op: "notIn",
    values: ["2", "3"],
  }]);
  isTrue(
    getNotIn.every((d) => ![2, 3].includes(d.num)),
    "[notIn] should only return rows with value not in",
  );
  const getNotInIds = getNotIn.map((d) => d.__id);
  isTrue(
    getNotInIds.includes(one.__id),
    "[notIn] should return inserted row with value not in",
  );
  isFalse(
    getNotInIds.includes(two.__id),
    "[notIn] should not return inserted row with value in",
  );
  isFalse(
    getNotInIds.includes(three.__id),
    "[notIn] should not return inserted row with value in",
  );
});

Deno.test("[sqlite connector] table.get like / notLike", async () => {
  const LIKE = "like";
  const table = await getTable();
  const data = { todo: "todo", done: false, num: 1 };

  const contains = await table.insert({ ...data, todo: `aaa${LIKE}aaaa` });
  const atStart = await table.insert({ ...data, todo: `${LIKE}aaaaa` });
  const atEnd = await table.insert({ ...data, todo: `aaaa${LIKE}` });

  const likeContains = await table.get([
    {
      column: "todo",
      op: "like",
      value: LIKE,
      place: "contains",
    },
  ]);
  isTrue(likeContains.every((d) => d.todo.includes(LIKE)));
  const likeContainsIds = likeContains.map((d) => d.__id);
  isTrue(likeContainsIds.includes(contains.__id));
  isTrue(likeContainsIds.includes(atStart.__id));
  isTrue(likeContainsIds.includes(atEnd.__id));

  const likeStart = await table.get([
    {
      column: "todo",
      op: "like",
      value: LIKE,
      place: "start",
    },
  ]);
  isTrue(likeStart.every((d) => d.todo.startsWith(LIKE)));
  const likeStartIds = likeStart.map((d) => d.__id);
  isFalse(likeStartIds.includes(contains.__id));
  isTrue(likeStartIds.includes(atStart.__id));
  isFalse(likeStartIds.includes(atEnd.__id));

  const likeEnd = await table.get([
    {
      column: "todo",
      op: "like",
      value: LIKE,
      place: "end",
    },
  ]);
  isTrue(likeEnd.every((d) => d.todo.endsWith(LIKE)));
  const likeEndIds = likeEnd.map((d) => d.__id);
  isFalse(likeEndIds.includes(contains.__id));
  isFalse(likeEndIds.includes(atStart.__id));
  isTrue(likeEndIds.includes(atEnd.__id));

  const notLikeContains = await table.get([
    {
      column: "todo",
      op: "notLike",
      value: LIKE,
      place: "contains",
    },
  ]);
  isTrue(notLikeContains.every((d) => !d.todo.includes(LIKE)));
  const notLikeContainsIds = notLikeContains.map((d) => d.__id);
  isFalse(notLikeContainsIds.includes(contains.__id));
  isFalse(notLikeContainsIds.includes(atStart.__id));
  isFalse(notLikeContainsIds.includes(atEnd.__id));

  const notLikeStart = await table.get([
    {
      column: "todo",
      op: "notLike",
      value: LIKE,
      place: "start",
    },
  ]);
  isTrue(notLikeStart.every((d) => !d.todo.startsWith(LIKE)));
  const notLikeStartIds = notLikeStart.map((d) => d.__id);
  isTrue(notLikeStartIds.includes(contains.__id));
  isFalse(notLikeStartIds.includes(atStart.__id));
  isTrue(notLikeStartIds.includes(atEnd.__id));

  const notLikeEnd = await table.get([
    {
      column: "todo",
      op: "notLike",
      value: LIKE,
      place: "end",
    },
  ]);
  isTrue(notLikeEnd.every((d) => !d.todo.endsWith(LIKE)));
  const notLikeEndIds = notLikeEnd.map((d) => d.__id);
  isTrue(notLikeEndIds.includes(contains.__id));
  isTrue(notLikeEndIds.includes(atStart.__id));
  isFalse(notLikeEndIds.includes(atEnd.__id));
});

Deno.test("[sqlite connector] table.get lt / lte / gt / gte", async () => {
  const table = await getTable();
  const data = { todo: "todo", done: false, num: 1 };

  const ten = await table.insert({ ...data, num: 10 });
  const eleven = await table.insert({ ...data, num: 11 });
  const x = await table.insert({ ...data, todo: "x" });
  const y = await table.insert({ ...data, todo: "y" });

  const getGtNum = await table.get([{
    column: "num",
    op: "gt",
    value: "10",
  }]);
  isTrue(getGtNum.every((d) => d.num > 10));
  const getGtNumIds = getGtNum.map((d) => d.__id);
  isFalse(getGtNumIds.includes(ten.__id));
  isTrue(getGtNumIds.includes(eleven.__id));

  const getGtStr = await table.get([{
    column: "todo",
    op: "gt",
    value: "x",
  }]);
  isTrue(getGtStr.every((d) => d.todo > "x"));
  const getGtStrIds = getGtStr.map((d) => d.__id);
  isFalse(getGtStrIds.includes(x.__id));
  isTrue(getGtStrIds.includes(y.__id));

  const getGteNum = await table.get([{
    column: "num",
    op: "gte",
    value: "11",
  }]);
  isTrue(getGteNum.every((d) => d.num >= 11));
  const getGteNumIds = getGteNum.map((d) => d.__id);
  isFalse(getGteNumIds.includes(ten.__id));
  isTrue(getGteNumIds.includes(eleven.__id));

  const getGteStr = await table.get([{
    column: "todo",
    op: "gte",
    value: "y",
  }]);
  isTrue(getGteStr.every((d) => d.todo >= "y"));
  const getGteStrIds = getGteStr.map((d) => d.__id);
  isFalse(getGteStrIds.includes(x.__id));
  isTrue(getGteStrIds.includes(y.__id));

  const getLtNum = await table.get([{
    column: "num",
    op: "lt",
    value: "11",
  }]);
  isTrue(getLtNum.every((d) => d.num < 11));
  const getLtNumIds = getLtNum.map((d) => d.__id);
  isTrue(getLtNumIds.includes(ten.__id));
  isFalse(getLtNumIds.includes(eleven.__id));

  const getLtStr = await table.get([{
    column: "todo",
    op: "lt",
    value: "y",
  }]);
  isTrue(getLtStr.every((d) => d.todo < "y"));
  const getLtStrIds = getLtStr.map((d) => d.__id);
  isTrue(getLtStrIds.includes(x.__id));
  isFalse(getLtStrIds.includes(y.__id));

  const getLteNum = await table.get([{
    column: "num",
    op: "lte",
    value: "10",
  }]);
  isTrue(getLteNum.every((d) => d.num <= 10));
  const getLteNumIds = getLteNum.map((d) => d.__id);
  isTrue(getLteNumIds.includes(ten.__id));
  isFalse(getLteNumIds.includes(eleven.__id));

  const getLteStr = await table.get([{
    column: "todo",
    op: "lte",
    value: "x",
  }]);
  isTrue(getLteStr.every((d) => d.todo <= "x"));
  const getLteStrIds = getLteStr.map((d) => d.__id);
  isTrue(getLteStrIds.includes(x.__id));
  isFalse(getLteStrIds.includes(y.__id));
});

Deno.test("[sqlite connector] table.get sort", async () => {
  const table = await getTable();
  const data = Array.from(Array(10))
    .map(() => ({
      todo: "sort",
      done: false,
      num: Math.floor(Math.random() * 100),
    }));

  await Promise.all(data.map((d) => table.insert(d)));

  const sorted = await table.get(
    [{ column: "todo", op: "eq", value: "sort" }],
    { column: "num", desc: true },
  );
  const sortedDesc = await table.get([{
    column: "todo",
    op: "eq",
    value: "sort",
  }], { column: "num", desc: true });
  isEq(sorted, sortedDesc);

  const sortedDescNums = sortedDesc.map((d) => d.num);
  isEq(sortedDescNums, [...sortedDescNums].sort((a, b) => a > b ? -1 : 1));

  const sortedAsc = await table.get([{
    column: "todo",
    op: "eq",
    value: "sort",
  }], { column: "num" });
  const sortedAscNums = sortedAsc.map((d) => d.num);
  isEq(sortedAscNums, [...sortedAscNums].sort((a, b) => a > b ? 1 : -1));
  isEq(sortedAscNums, [...sortedDescNums].reverse());
});

Deno.test("[sqlite connector] table.get limit / offset", async () => {
  const table = await getTable();
  const data = Array.from(Array(10))
    .map((_, i) => ({
      todo: "limit-offset",
      done: false,
      num: i + 1,
    }));

  await Promise.all(data.map((d) => table.insert(d)));

  const first5 = await table.get(
    [{ column: "todo", op: "eq", value: "limit-offset" }],
    { column: "num" },
    5,
  );

  isEq(first5.length, 5);
  isEq(first5[0].num, 1);
  isEq(first5[4].num, 5);

  const next5 = await table.get(
    [{ column: "todo", op: "eq", value: "limit-offset" }],
    { column: "num" },
    5,
    5,
  );

  isEq(next5.length, 5);
  isEq(next5[0].num, 6);
  isEq(next5[4].num, 10);
});

Deno.test("[sqlite connector] table.update", async () => {
  const table = await getTable();
  const data = { todo: "todo", done: false, num: 1 };
  const { __id } = await table.insert(data);

  const TODO = "aaaaaa";
  await table.update({ __id, todo: TODO });
  const upd1 = await table.getById(__id);
  isEq(upd1?.todo, TODO);

  const DONE = true;
  await table.update({ __id, done: DONE });
  const upd2 = await table.getById(__id);
  isEq(upd2?.done, DONE);

  const NUM = 4;
  await table.update({ __id, num: NUM });
  const upd3 = await table.getById(__id);
  isEq(upd3?.num, NUM);
});

Deno.test("[sqlite connector] table.remove", async () => {
  const table = await getTable();
  const data = { todo: "todo", done: false, num: 1 };
  const { __id } = await table.insert(data);

  await table.remove(__id);

  const all = await table.get();
  isFalse(all.map((d) => d.__id).includes(__id));
});

Deno.test("[sqlite connector] listTables", async () => {
  const tables = await db.listTables();
  isTrue(tables.map((d) => d.name).includes("todos"));
  isTrue(tables.map((d) => d.label).includes("Todos"));
  isEq(tables[0].fields, todoFields);
});

Deno.test("[sqlite connector] getFieldsByTableName", async () => {
  isEq(await db.getFieldsByTableName("todos"), todoFields);
  isFalsy(await db.getFieldsByTableName("not-a-table"));
});

Deno.test("[sqlite connector] dropTable", async () => {
  await db.dropTable("todos");
  isFalse((await db.listTables()).map((d) => d.name).includes("todos"));
});

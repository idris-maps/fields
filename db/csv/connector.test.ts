import test from "../run-tests.ts";
import connector from "./mod.ts";

const folder = "db/csv/__test__";
const db = await connector(folder);

await test("csv", db);

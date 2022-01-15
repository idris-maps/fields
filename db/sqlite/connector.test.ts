import test from "../run-tests.ts";
import connector from "./mod.ts";

const db = await connector(":memory:");

test("sqlite", db);

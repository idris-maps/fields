import _db from "../db/sqlite/mod.ts";
import server from "./mod.ts";

const db = await _db(":memory:");

server(db, 3000);

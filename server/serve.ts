import _db from "../db/sqlite/mod.ts";
import server from "./mod.ts";

const db = await _db("test.db");

server(db, 3000);

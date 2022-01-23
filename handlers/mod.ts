import tables from "./table-handlers.ts";
import meta from "./meta-handlers.ts";
import type { FieldsDb } from "./deps.ts";

export * from "./types.d.ts";
export default (db: FieldsDb) => ({
  meta: meta(db),
  tables: tables(db),
});

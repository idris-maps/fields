import { handlers, server } from "./deps.ts";
import routes from "./routes/mod.ts";
import type { FieldsDb } from "./deps.ts";
import type { Local } from "./utils.ts";

export default (db: FieldsDb, port = 3000) => {
  const { meta, tables } = handlers(db);

  server<Local>({
    port,
    local: { meta, tables },
    routes,
  });
};

import { handlers, server } from "./deps.ts";
import routes from "./routes.ts";
import { getRelativePath } from './utils/index.ts'
import type { FieldsDb } from "./deps.ts";
import type { Local } from "./local.ts";

export default (db: FieldsDb, port: number) =>
  server<Local>({
    port,
    routes,
    local: {
      ...handlers(db),
      utils: { getRelativePath },
    },
  });

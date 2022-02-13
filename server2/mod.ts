import { handlers, server } from "./deps.ts";
import routes from "./routes.ts";
import type { FieldsDb } from "./deps.ts";
import type { Local } from "./local.ts";

const getPort = () => {
  const arg = Deno.args.find((d) => d.startsWith("--port"));
  const _val = arg ? arg.split("=")[1] : undefined;
  const val = Number(_val);
  return Number.isNaN(val) ? 3000 : val;
};

export default (db: FieldsDb) =>
  server<Local>({
    port: getPort(),
    routes,
    local: handlers(db),
  });

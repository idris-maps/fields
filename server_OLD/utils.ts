import type {
  Endpoint,
  FieldsMetaHandlers,
  FieldsTableHandlers,
  Req,
} from "./deps.ts";

export interface Local {
  meta: FieldsMetaHandlers;
  tables: FieldsTableHandlers;
}

export type Route = Endpoint<Local>;

export const last = <T>(arr: T[]): T | undefined => arr[arr.length - 1];
export const init = <T>(arr: T[]): T[] => arr.slice(0, -1);

const getRoute = (meta: ImportMeta) => {
  const path = meta.url.split("/routes")[1];
  if (!path) throw `${meta.url} is not in a \"routes\" folder`;
  return init(
    path.split("/")
      .map((d) =>
        d.startsWith("[") && d.endsWith("]") ? ":" + d.slice(1, -1) : d
      ),
  ).join("/");
};

export const setRoute = (
  meta: ImportMeta,
  endpoints: Endpoint<Local>[],
): Endpoint<Local>[] => {
  const route = getRoute(meta);
  return endpoints.map((d) => ({ ...d, path: route }));
};

const handler = (method: string) =>
  (
    func: (req: Req, local: Local) => Promise<{ status: number; body?: any }>,
  ): Endpoint<Local> => ({
    method,
    path: "",
    handler: async (req, res, local) => {
      const { status, body } = await func(req, local);
      return res.json(body || {}, { status });
    },
  });

export const handle = {
  get: handler("GET"),
  post: handler("POST"),
  patch: handler("PATCH"),
  put: handler("PUT"),
  delete: handler("DELETE"),
};

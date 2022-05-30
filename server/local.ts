import type {
  Endpoint as _Endpoint,
  FieldsMetaHandlers,
  FieldsTableHandlers,
  Handler as _Handler,
} from "./deps.ts";

export interface Local {
  meta: FieldsMetaHandlers;
  tables: FieldsTableHandlers;
  utils: {
    getRelativePath: (meta: ImportMeta, path: string) => string
  }
}

export type Handler = _Handler<Local>;

export type Endpoint = _Endpoint<Local>;

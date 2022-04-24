import type { Field, JSONSchema7, Table as _Table } from "./deps.ts";

export type Table = _Table;

type Res<T = any> = Promise<{ status: number; body?: T }>;

export interface FieldsTableHandlers {
  delete: (name: string, id: string) => Res;
  get: (name: string, id: string) => Res;
  getAll: (name: string, query?: { [key: string]: string }) => Res;
  patch: (name: string, id: string, data: any) => Res;
  post: (name: string, data: any) => Res;
  put: (name: string, id: string, data: any) => Res;
}

export interface FieldsMetaHandlers {
  delete: (name: string) => Res;
  getAll: () => Res<Table[]>;
  getFields: (name: string) => Res<Field[]>;
  getOne: (name: string) => Res<Table>;
  getSchema: (name: string) => Res<JSONSchema7>;
  post: (data: any) => Res;
}

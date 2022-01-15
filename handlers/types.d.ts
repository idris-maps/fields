import type { Field } from "./deps.ts";

type Res = Promise<{ status: number; body?: any }>;

export interface FieldsTableHandlers {
  delete: (id: string) => Res;
  get: (id: string) => Res;
  getAll: (query?: { [key: string]: string }) => Res;
  patch: (id: string, data: any) => Res;
  post: (data: any) => Res;
  put: (id: string, data: any) => Res;
}

export interface FieldsMetaHandlers {
  delete: (name: string) => Res;
  getFields: (name: string) => Res;
  getAll: () => Res;
  getSchema: (name: string) => Res;
  post: (name: string, fields: Field[]) => Res;
}

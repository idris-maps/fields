import { Field, Filter } from "./deps.ts";

type WithId<T> = T & { __id: string };

export interface FieldsTableSort {
  column: string;
  asc?: boolean;
}

export interface FieldsDbTable<T> {
  fields: Field[];
  get: (filters?: Filter[], sort?: FieldsTableSort) => Promise<WithId<T>[]>;
  getById: (id: string) => Promise<WithId<T> | undefined>;
  insert: (d: T) => Promise<WithId<T>>;
  name: string;
  remove: (id: string) => Promise<void>;
  update: (data: WithId<Partial<T>>) => Promise<WithId<T>>;
}

export interface FieldsDb {
  createTable: (
    name: string,
    fields: Field[],
  ) => Promise<boolean>;
  initTable: <T>(
    name: string,
  ) => Promise<FieldsDbTable<T> | undefined>;
  dropTable: (name: string) => Promise<void>;
  getFieldsByTableName: (name: string) => Promise<Field[] | undefined>;
  listTables: () => Promise<{ name: string; fields: Field[] }[]>;
}

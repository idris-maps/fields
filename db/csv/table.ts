import type { Field, Filter } from "./deps.ts";
import type { FieldsDbTable } from "../types.d.ts";
import { exists } from "./fs.ts";
import { filter, find, map, toArray } from "./deps.ts";
import {
  createFile,
  getFiltering,
  saveFile,
  streamData,
  toDsvLine,
} from "./table.utils.ts";

const insert = async <T>(path: string, fields: Field[], data: T) => {
  const __id = crypto.randomUUID();
  const row = `${__id},${toDsvLine(fields, ",", data)}`;
  await Deno.writeTextFile(path, "\n" + row, { create: false, append: true });
  return { ...data, __id };
};

const update = async <T>(
  folder: string,
  path: string,
  fields: Field[],
  data: Partial<T> & { __id: string },
): Promise<T & { __id: string }> => {
  const { __id, ...next } = data;
  let updated: T & { __id: string } | undefined;
  const stream = await streamData(path, fields, [
    map((d: T & { __id: string }) => {
      if (d.__id === __id) {
        updated = { ...d, ...next };
        return updated;
      } else {
        return d;
      }
    }),
  ]);

  await saveFile(folder, path, stream);

  if (!updated) {
    throw `__id: ${__id} does not exist`;
  }

  return updated;
};

const remove = async <T>(
  folder: string,
  path: string,
  fields: Field[],
  id: string,
): Promise<void> => {
  const stream = await streamData(path, fields, [
    filter((d: any) => d.__id !== id),
  ]);
  await saveFile(folder, path, stream);
  return undefined;
};

const getById = async <T>(
  path: string,
  fields: Field[],
  id: string,
) => {
  const stream = await streamData(path, fields);
  const findById = await find<T>((d: any) => d.__id === id);
  const data = await findById(stream);
  return data;
};

const get = async <T>(
  path: string,
  fields: Field[],
  filters?: Filter[],
): Promise<T[]> => {
  const stream = await streamData(path, fields, getFiltering(filters));
  return toArray(stream);
};

export const createTable = async (
  folder: string,
  name: string,
  fields: Field[],
): Promise<boolean> => {
  const path = `${folder}/${name}.csv`;
  const fileExists = await exists(path);

  if (!fileExists) {
    await createFile(path, fields);
  }

  return true;
};

export const initTable = async <T>(
  folder: string,
  name: string,
  fields: Field[],
): Promise<FieldsDbTable<T> | undefined> => {
  const path = `${folder}/${name}.csv`;
  const fileExists = await exists(path);

  if (!fileExists) {
    return undefined;
  }

  return {
    insert: (d: T) => insert(path, fields, d),
    update: (d: Partial<T> & { __id: string }) =>
      update(folder, path, fields, d),
    name,
    fields,
    remove: (id: string) => remove(folder, path, fields, id),
    getById: (id: string) => getById(path, fields, id),
    get: (filters?: Filter[]) =>
      get<T & { __id: string }>(path, fields, filters),
  };
};

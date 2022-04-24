import { deleteFile, exists, readJson, saveJson } from "./fs.ts";
import type { Field } from "./deps.ts";

const FILE_NAME = "__tables__.json";
const getFilePath = (folder: string) => `${folder}/${FILE_NAME}`;

interface Table {
  name: string;
  label: string;
  fields: Field[];
}

type TableStore = Map<string, { label: string; fields: Field[] }>;

const getTablesFromStore = (store: TableStore): Table[] =>
  Array.from(store.entries()).map(([name, d]) => ({ name, ...d }));

const saveTablesJson = (path: string, store: TableStore) =>
  saveJson(path, getTablesFromStore(store));

const init = async (path: string) => {
  const fileExists = await exists(path);
  const store = new Map<string, { label: string; fields: Field[] }>();

  if (fileExists) {
    try {
      const tables = await readJson<Table[]>(path);
      tables.forEach(({ name, label, fields }) => {
        store.set(name, { label, fields });
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    await saveJson(path, []);
  }

  return store;
};

const addTable = async (
  path: string,
  store: TableStore,
  name: string,
  label: string,
  fields: Field[],
) => {
  if (store.get(name)) {
    return false;
  }
  store.set(name, { label, fields });
  await saveTablesJson(path, store);
  return true;
};

const getFieldsByTableName = (store: TableStore, name: string) => {
  const table = store.get(name);
  return table ? table.fields : undefined;
};

const getTableByName = (store: TableStore, name: string) => {
  const table = store.get(name);
  return table ? { ...table, name } : undefined;
};

const dropTable = async (
  folder: string,
  path: string,
  store: TableStore,
  name: string,
) => {
  store.delete(name);
  await deleteFile(`${folder}/${name}.csv`);
  return saveTablesJson(path, store);
};

const createFolderIfNotExists = async (folder: string) => {
  if (await exists(folder)) return;
  await Deno.mkdir(folder, { recursive: true });
  return;
};

export default async (folder: string) => {
  await createFolderIfNotExists(folder);
  const path = getFilePath(folder);
  const store = await init(path);

  return {
    add: (name: string, label: string, fields: Field[]) =>
      addTable(path, store, name, label, fields),
    getFieldsByTableName: async (name: string) =>
      await getFieldsByTableName(store, name),
    getTableByName: async (name: string) => await getTableByName(store, name),
    drop: (name: string) => dropTable(folder, path, store, name),
    list: async () => await getTablesFromStore(store),
  };
};

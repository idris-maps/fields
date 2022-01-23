import { deleteFile, exists, readJson, saveJson } from "./fs.ts";
import type { Field } from "./deps.ts";

const FILE_NAME = "__tables__.json";
const getFilePath = (folder: string) => `${folder}/${FILE_NAME}`;

interface Table {
  name: string;
  fields: Field[];
}

const getTablesFromStore = (store: Map<string, Field[]>): Table[] =>
  Array.from(store.entries()).map(([name, fields]) => ({ name, fields }));

const saveTablesJson = (path: string, store: Map<string, Field[]>) =>
  saveJson(path, getTablesFromStore(store));

const init = async (path: string) => {
  const fileExists = await exists(path);
  const store = new Map<string, Field[]>();

  if (fileExists) {
    try {
      const tables = await readJson<Table[]>(path);
      tables.forEach(({ name, fields }) => {
        store.set(name, fields);
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
  store: Map<string, Field[]>,
  name: string,
  fields: Field[],
) => {
  if (store.get(name)) {
    return false;
  }
  store.set(name, fields);
  await saveTablesJson(path, store);
  return true;
};

const getFieldsByTableName = (store: Map<string, Field[]>, name: string) =>
  store.get(name);

const dropTable = async (
  folder: string,
  path: string,
  store: Map<string, Field[]>,
  name: string,
) => {
  store.delete(name);
  await deleteFile(`${folder}/${name}.csv`);
  return saveTablesJson(path, store);
};

const createFolderIfNotExists = async (folder: string) => {
  if (await exists(folder)) { return }
  await Deno.mkdir(folder, { recursive: true })
  return
}

export default async (folder: string) => {
  await createFolderIfNotExists(folder)
  const path = getFilePath(folder);
  const store = await init(path);

  return {
    add: (name: string, fields: Field[]) => addTable(path, store, name, fields),
    getFieldsByTableName: async (name: string) =>
      await getFieldsByTableName(store, name),
    drop: (name: string) => dropTable(folder, path, store, name),
    list: async () => await getTablesFromStore(store),
  };
};

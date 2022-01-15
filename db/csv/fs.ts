export const exists = async (path: string) => {
  try {
    return Boolean(await Deno.stat(path));
  } catch {
    return false;
  }
};

export const saveJson = async (path: string, json: unknown) =>
  await Deno.writeTextFile(path, JSON.stringify(json, null, 2), {
    create: true,
  });

export const readJson = async <T = unknown>(path: string): Promise<T> => {
  const txt = await Deno.readTextFile(path);
  return JSON.parse(txt);
};

export const deleteFile = async (path: string) => {
  try {
    await Deno.remove(path);
  } catch {
    // do nothing
  }
  return undefined;
};

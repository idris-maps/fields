export const omit = <T extends object>(keys: string[], obj: T): Partial<T> => {
  let result: Partial<T> = {};
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    if (!keys.includes(key)) result[key] = obj[key];
  });
  return result;
};

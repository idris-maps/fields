import type { Field, Filter } from "./deps.ts";
import {
  filter,
  fromDsvFile,
  isCheckbox,
  isFilterEq,
  isFilterGt,
  isFilterGte,
  isFilterIn,
  isFilterLike,
  isFilterLt,
  isFilterLte,
  isFilterNotEq,
  isFilterNotIn,
  isFilterNotLike,
  isNumericField,
  toDsvFile,
} from "./deps.ts";

export const createFile = (path: string, fields: Field[]) =>
  Deno.writeTextFile(
    path,
    '"__id",' + fields.map((d: Field) => `"${d.property}"`).join(","),
  );

export const isString = (d: unknown): d is string => String(d) === d;

export const saveFile = async (
  folder: string,
  path: string,
  stream: { iterable: AsyncIterableIterator<unknown>; rid?: number },
) => {
  const tmp = `${folder}/${crypto.randomUUID()}.csv`;
  await toDsvFile(stream, tmp);
  await Deno.remove(path);
  await Deno.rename(tmp, path);
};

export const toDsvLine = (fields: Field[], delimiter: string, d: unknown) =>
  fields
    .map((d) => d.property)
    .reduce((r: unknown[], key: string) => {
      // @ts-ignore _
      const val = d[key];
      return [...r, isString(val) ? `"${val}"` : val];
    }, [])
    .join(delimiter);

type PipeFunction = (
  d: AsyncIterableIterator<any>,
) => AsyncIterableIterator<any>;

export const streamData = async (
  path: string,
  fields: Field[],
  pipe: PipeFunction[] = [],
) => {
  const numeric = fields.filter(isNumericField).map((d) => d.property);
  const bool = fields.filter(isCheckbox).map((d) => d.property);

  return await fromDsvFile(path, { numeric, bool }, pipe);
};

const isPipeFilter = (d: PipeFunction | undefined): d is PipeFunction =>
  Boolean(d);

export const getFiltering = (
  filters?: Filter[],
): PipeFunction[] | undefined => {
  if (!filters) return undefined;

  // @ts-ignore _
  const pipe: PipeFunction[] = filters
    .map((f) => {
      if (isFilterEq(f)) {
        return filter((d: any) => String(d[f.column]) === f.value);
      }
      if (isFilterGt(f)) {
        return filter((d: any) => d[f.column] > f.value);
      }
      if (isFilterGte(f)) {
        return filter((d: any) => d[f.column] >= f.value);
      }
      if (isFilterIn(f)) {
        return filter((d: any) => f.values.includes(String(d[f.column])));
      }
      if (isFilterLike(f)) {
        return filter((d: any) => {
          const val = String(d[f.column]);
          switch (f.place) {
            case "start":
              return val.startsWith(f.value);
            case "end":
              return val.endsWith(f.value);
            default:
              return val.includes(f.value);
          }
        });
      }
      if (isFilterLt(f)) {
        return filter((d: any) => d[f.column] < f.value);
      }
      if (isFilterLte(f)) {
        return filter((d: any) => d[f.column] <= f.value);
      }
      if (isFilterNotEq(f)) {
        return filter((d: any) => String(d[f.column]) !== f.value);
      }
      if (isFilterNotIn(f)) {
        return filter((d: any) => !f.values.includes(String(d[f.column])));
      }
      if (isFilterNotLike(f)) {
        return filter((d: any) => {
          const val = String(d[f.column]);
          switch (f.place) {
            case "start":
              return !val.startsWith(f.value);
            case "end":
              return !val.endsWith(f.value);
            default:
              return !val.includes(f.value);
          }
        });
      }
      return undefined;
    })
    .filter(isPipeFilter);

  return pipe;
};

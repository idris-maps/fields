import type { Filter } from './types.ts'
import type { Field } from './deps.ts'

const isPlace = (d?: string): d is "start" | "end" | "contains" =>
Boolean(d) && ["start", "end", "contains"].includes(String(d));

const parseFilter = (
  key: string,
  value: string,
  isColumn: (d: string) => boolean,
): Filter | undefined => {
  const [column, op, place] = key.split(".");

  if (!isColumn(column)) return undefined;

  switch (op) {
    case "eq":
      return { column, op: "eq", value };
    case "in":
      return { column, op: "in", values: value.split(",") };
    case "like":
      return isPlace(place) ? { column, op: "like", place, value } : undefined;
    case "notEq":
      return { column, op: "notEq", value };
    case "notIn":
      return { column, op: "notIn", values: value.split(",") };
    case "notLike":
      return isPlace(place)
        ? { column, op: "notLike", place, value }
        : undefined;
    case "gt":
      return { column, op: "gt", value };
    case "gte":
      return { column, op: "gte", value };
    case "lt":
      return { column, op: "lt", value };
    case "lte":
      return { column, op: "lte", value };
    default:
      return undefined;
  }
};

const parseFilters = (fields: Field[]) => {
  const columns = fields.map((d) => d.property);
  const isColumn = (d: string) => columns.includes(d);

  return (data: { [key: string]: string }) =>
    Object.keys(data)
      .reduce((filtering: Filter[], key: string): Filter[] => {
        const value = data[key];
        if (!value || value.trim() === "") return filtering;
        const filter = parseFilter(key, value, isColumn);
        return filter ? [...filtering, filter] : filtering;
      }, []);
};

export default parseFilters;

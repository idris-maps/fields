import type { Sql } from "../mod.ts";
import type { Filter } from "../deps.ts";
import type { FieldsTableSort } from "../../types.d.ts";

const getLikeValue = (place: "start" | "end" | "contains", value: string) => {
  switch (place) {
    case "contains":
      return `%${value}%`;
    case "end":
      return `%${value}`;
    default:
      return `${value}%`;
  }
};

const getPart = (filter: Filter) => {
  const { op, column } = filter;

  switch (op) {
    case "eq":
      return [`${column} = ?`, [filter.value]];
    case "notEq":
      return [`${column} != ?`, [filter.value]];
    case "in":
      return [
        `${column} IN (${filter.values.map(() => "?").join(",")})`,
        filter.values,
      ];
    case "notIn":
      return [
        `${column} NOT IN (${filter.values.map(() => "?").join(",")})`,
        filter.values,
      ];
    case "like":
      return [`${column} LIKE ?`, [getLikeValue(filter.place, filter.value)]];
    case "notLike":
      return [`${column} NOT LIKE ?`, [
        getLikeValue(filter.place, filter.value),
      ]];
    case "lt":
      return [`${column} < ?`, [filter.value]];
    case "lte":
      return [`${column} <= ?`, [filter.value]];
    case "gt":
      return [`${column} > ?`, [filter.value]];
    case "gte":
      return [`${column} >= ?`, [filter.value]];
    default:
      return [];
  }
};

export default async <T>(
  sql: Sql,
  table: string,
  filters?: Filter[],
  sort?: FieldsTableSort,
  limit?: number,
  offset?: number,
): Promise<T[]> => {
  const _filters = filters ? filters.map(getPart).filter((d) => d[0]) : [];
  const _sort = sort
    ? `ORDER BY ${sort.column} ${sort.desc ? "DESC" : "ASC"}`
    : "";
  const _limit = limit ? `LIMIT ${limit}` : "";
  const _offset = offset ? `OFFSET ${offset}` : "";

  const query = [
    `SELECT * FROM ${table}`,
    _filters.length ? "WHERE" : "",
    _filters.map((d) => d[0]).join(" AND "),
    _sort,
    _limit,
    _offset,
  ].filter((d) => d !== "").join(" ");

  return await sql<T[]>(query, _filters.reduce((r, d) => [...r, ...d[1]], []));
};

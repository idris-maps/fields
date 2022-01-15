export interface FilterEq {
  column: string;
  op: "eq";
  value: string;
}

export interface FilterIn {
  column: string;
  op: "in";
  values: string[];
}

export interface FilterLike {
  column: string;
  op: "like";
  value: string;
  place: "start" | "end" | "contains";
}

export interface FilterNotEq {
  column: string;
  op: "notEq";
  value: string;
}

export interface FilterNotIn {
  column: string;
  op: "notIn";
  values: string[];
}

export interface FilterNotLike {
  column: string;
  op: "notLike";
  value: string;
  place: "start" | "end" | "contains";
}

export interface FilterGt {
  column: string;
  op: "gt";
  value: string;
}

export interface FilterGte {
  column: string;
  op: "gte";
  value: string;
}

export interface FilterLt {
  column: string;
  op: "lt";
  value: string;
}

export interface FilterLte {
  column: string;
  op: "lte";
  value: string;
}

export type Filter =
  | FilterEq
  | FilterIn
  | FilterLike
  | FilterNotEq
  | FilterNotIn
  | FilterNotLike
  | FilterGt
  | FilterGte
  | FilterLt
  | FilterLte;

export const isFilterEq = (d: Filter): d is FilterEq => d.op === "eq";
export const isFilterIn = (d: Filter): d is FilterIn => d.op === "in";
export const isFilterLike = (d: Filter): d is FilterLike => d.op === "like";
export const isFilterNotEq = (d: Filter): d is FilterNotEq => d.op === "notEq";
export const isFilterNotIn = (d: Filter): d is FilterNotIn => d.op === "notIn";
export const isFilterNotLike = (d: Filter): d is FilterNotLike =>
  d.op === "notLike";
export const isFilterGt = (d: Filter): d is FilterGt => d.op === "gt";
export const isFilterGte = (d: Filter): d is FilterGte => d.op === "gte";
export const isFilterLt = (d: Filter): d is FilterLt => d.op === "lt";
export const isFilterLte = (d: Filter): d is FilterLte => d.op === "lte";

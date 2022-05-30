/** @jsx h */
import { h } from "../deps.ts";
import "../types.d.ts";

interface Props {
  condition: any;
  render: any;
}

export default ({ condition, render }: Props) =>
  Boolean(condition) ? render : undefined;

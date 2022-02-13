/** @jsx h */
import { h } from "../deps.ts";
import "../types.d.ts";

const Each = <T,>({ data, render }: { data: T[], render: (d: T, i: number) => any }) =>
    data.map(render)

export default Each

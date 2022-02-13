/** @jsx h */
import { h } from "../deps.ts";
import "../types.d.ts";
import type { Field } from "../deps.ts";

const Head = ({ fields }: { fields: Field[] }) => (
  <thead>
    <tr>
      {fields.map((d) => <th>{d.label || d.property || ""}</th>)}
    </tr>
  </thead>
);

const Row = ({ fields, data }: { fields: Field[]; data: any }) => (
  <tr>
    {fields.map(({ property, type }) => (
      <td>{data[property] || (type === "checkbox" ? "false" : "")}</td>
    ))}
  </tr>
);

const Table = ({ fields, data }: { fields: Field[]; data: any[] }) => (
  <table>
    <Head fields={fields} />
    <tbody>
      {data.map((d) => <Row fields={fields} data={d} />)}
    </tbody>
  </table>
);

export default Table;

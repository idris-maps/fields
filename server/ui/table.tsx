/** @jsx h */
import { h } from "../deps.ts";
import "../types.d.ts";
import type { Field } from "../deps.ts";
import Each from "./each.tsx";

const Head = ({ fields }: { fields: Field[] }) => (
  <thead>
    <tr>
      <Each<Field>
        data={fields}
        render={(d) => <th>{d.label || d.property || ""}</th>}
      />
    </tr>
  </thead>
);

const Row = ({ fields, data }: { fields: Field[]; data: any }) => (
  <tr>
    <Each<Field>
      data={fields}
      render={({ property, type }) => (
        <td>{data[property] || (type === "checkbox" ? "false" : "")}</td>
      )}
    />
  </tr>
);

const Table = ({ fields, data }: { fields: Field[]; data: any[] }) => (
  <table>
    <Head fields={fields} />
    <tbody>
      <Each<any>
        data={data}
        render={(d) => <Row fields={fields} data={d} />}
      />
    </tbody>
  </table>
);

export default Table;

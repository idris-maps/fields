import { html } from "../deps.ts";
import type { Field } from "../deps.ts";

const head = (fields: Field[]) =>
  html`
    <thead>
      <tr>
        ${fields.map((d) => `<th>${d.label || d.property || ""}</th>`)}
      </tr>
    </thead>
`;

const row = (fields: Field[]) =>
  (data: any) =>
    html`
      <tr>
        ${
      fields.map(({ property, type }) =>
        `<td>${data[property] || (type === "checkbox" ? "false" : "")}</td>`
      )
    }
      </tr>
  `;

export default (fields: Field[], data: any[]) =>
  html`
  <table>
  ${head(fields)}
  <tbody>
    ${data.map(row(fields))}
  </tbody>
  </table>
`;

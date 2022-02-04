import { html } from "../deps.ts";
import type { Field } from "../deps.ts";
import field from './field.ts'

export default (
  method: 'POST' | 'PUT' | 'UPDATE',
  action: string,
  fields: Field[],
  submitLabel?: string,
) => html`
  <form action="${action}" method="${method}">
    ${fields.map(field)}
    <input type="submit" ${submitLabel ? `value="${submitLabel}"` : ''} />
  </form>
`
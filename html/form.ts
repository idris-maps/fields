import type { Field } from "./deps.ts";
import { html } from './deps.ts'
import renderField from "./field.ts";

interface Props {
  method: "POST" | "PUT" | "UPDATE";
  action: string;
  fields: Field[];
  submitLabel?: string;
}

export default ({
  method,
  action,
  fields,
  submitLabel,
}: Props) =>
  html`
    <form ${{ action, method }}>
      ${fields.map(d => renderField({ field: d }))}
      <input ${{ type: "submit", ...(submitLabel ? { value: submitLabel } : {}) }} />
    </form>
  `

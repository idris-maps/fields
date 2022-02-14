/** @jsx h */
import { h } from "../deps.ts";
import "../types.d.ts";
import type { Field } from "../deps.ts";
import FieldComponent from "./field.tsx";
import Each from "./each.tsx";

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
}: Props) => (
  <form action={action} method={method}>
    <Each<Field>
      data={fields}
      render={(d) => <FieldComponent field={d} />}
    />
    <input {...{ type: "submit", value: submitLabel || undefined }} />
  </form>
);

/** @jsx h */
import { h } from "../deps.ts";
import "../types.d.ts";
import { isCheckbox, isEnumField, isEnumString, isTextarea } from "../deps.ts";
import type { Field, Radio, Select, SelectOption } from "../deps.ts";
import Each from "./each.tsx";

const omit = <T extends object>(keys: string[], obj: T): Partial<T> => {
  let result: Partial<T> = {};
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    if (!keys.includes(key)) result[key] = obj[key];
  });
  return result;
};

const isSelected = (v: string, i: number, value?: string) =>
  value ? value === v : i === 0;

const Label = ({ field }: { field: Field }) => (
  <label for={field.property}>{field.label || field.property}</label>
);

const SelectOptions = ({
  options,
  value,
}: { options: string[] | SelectOption[]; value?: string }) => {
  const getAttributes = (d: string | SelectOption, i: number) =>
    isEnumString(d)
      ? { value: d, selected: isSelected(d, i, value) ? true : undefined }
      : {
        value: d.value,
        selected: isSelected(d.value, i, value) ? true : undefined,
      };

  return (
    <Each<string | SelectOption>
      data={options}
      render={(d, i) => (
        <option {...getAttributes(d, i)}>
          {isEnumString(d) ? d : d.label}
        </option>
      )}
    />
  );
};

const SelectField = ({ field }: { field: Select }) => (
  <div class={`field field-${field.type}`}>
    <Label field={field} />
    <select name={field.property}>
      <SelectOptions options={field.options} value={field.value} />
    </select>
  </div>
);

const RadioOptions = ({
  property,
  options,
  value,
}: {
  property: string;
  options: string[] | SelectOption[];
  value?: string;
}) => {
  const attrs = { type: "radio", name: property };
  const getAttributes = (d: string | SelectOption, i: number) =>
    isEnumString(d)
      ? { ...attrs, id: d, value: d, checked: isSelected(d, i, value) }
      : {
        ...attrs,
        id: d.value,
        value: d.value,
        checked: isSelected(d.value, i, value),
      };

  return (
    <Each<string | SelectOption>
      data={options}
      render={(d, i) => (
        <div class="field-radio-option">
          <input {...getAttributes(d, i)} />
          <label for={isEnumString(d) ? d : d.label}>
            {isEnumString(d) ? d : d.label}
          </label>
        </div>
      )}
    />
  );
};

const RadioField = ({ field }: { field: Radio }) => (
  <fieldset class={`field field-${field.type}`}>
    <legend>{field.label || field.property}</legend>
    <RadioOptions
      options={field.options}
      property={field.property}
      value={field.value}
    />
  </fieldset>
);

const getAttributes = (
  { property, ...rest }: { property: string; [key: string]: any },
) =>
  Object.entries(omit(["label", "notRequired"], rest))
    .reduce(
      (r, [key, value]) => ({ ...r, [key.toLowerCase()]: value }),
      rest.notRequired
        ? { name: property }
        : { name: property, required: true },
    );

export default ({ field }: { field: Field }) => {
  const d = field;

  if (isEnumField(d)) {
    return d.type === "select"
      ? <SelectField field={d} />
      : <RadioField field={d} />;
  }
  if (isTextarea(d)) {
    return (
      <div class={`field field-${d.type}`}>
        <Label field={d} />
        <textarea
          {...{ name: d.property, required: d.notRequired ? undefined : true }}
        >
          {d.value}
        </textarea>
      </div>
    );
  }
  if (isCheckbox(d)) {
    return (
      <div class={`field field-${d.type}`}>
        <input type="hidden" name={d.property} value="false"></input>
        <input
          {...{
            type: d.type,
            name: d.property,
            value: "true",
            checked: d.value ? true : undefined,
          }}
        />
        <Label field={d} />
      </div>
    );
  }
  return (
    <div class={`field field-${d.type}`}>
      <Label field={d} />
      <input {...getAttributes(d)} />
    </div>
  );
};

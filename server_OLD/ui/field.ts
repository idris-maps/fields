import {
  html,
  isCheckbox,
  isEnumField,
  isEnumString,
  isTextarea,
} from "../deps.ts";
import type { Field, Radio, Select } from "../deps.ts";

const omit = <T extends object>(keys: string[], obj: T): Partial<T> => {
  let result: Partial<T> = {};
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    if (!keys.includes(key)) result[key] = obj[key];
  });
  return result;
};

const label = (d: Field) =>
  html`<label for="${d.property}">${d.label || d.property}</label>`;

const select = (d: Select) => {
  const isSelected = (v: string, i: number) =>
    d.value && d.value === v ? true : i === 0;
  return html`
    ${label(d)}
    <select name="${d.property}">
      ${
    d.options.map((opt, i) =>
      isEnumString(opt)
        ? html`<option value="${opt}" ${
          isSelected(opt, i)
            ? "selected"
            : ""
        } >${opt}</option>`
        : html`<option value="${opt.value}" ${
          isSelected(opt.value, i) ? "selected" : ""
        } >${opt.label}</option>`
    )
  }
    </select>
  `;
};

const radio = (d: Radio) => {
  const isSelected = (v: string, i: number) =>
    d.value ? d.value === v : i === 0;

  const getAttributes = (value: string, checked: boolean) => ({
    type: "radio",
    name: d.property,
    id: value,
    value,
    checked,
  });
  return html`
    ${label(d)}
    ${
    d.options.map((opt, i) =>
      isEnumString(opt)
        ? html`
          <input ${getAttributes(opt, isSelected(opt, i))} />
          <label for="${opt}">${opt}</label>
        `
        : html`
          <input ${getAttributes(opt.value, isSelected(opt.value, i))} />
          <label for="${opt.value}">${opt.label}</label>
        `
    )
  }
  `;
};

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

export default (d: Field) => {
  if (isEnumField(d)) {
    return d.type === "select" ? select(d) : radio(d);
  }
  if (isTextarea(d)) {
    return html`
      ${label(d)}
      <textarea name="${d.property}" ${d.notRequired ? "" : "required"}>${
      d.value || ""
    }</textarea>
    `;
  }
  if (isCheckbox(d)) {
    return html`
      <input type="checkbox" name="${d.property}" ${d.value ? "checked" : ""} />
      ${label(d)}
    `;
  }
  return html`
    ${label(d)}
    <input ${getAttributes(d)} />
  `;
};

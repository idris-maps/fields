import {
  html,
  isEnumField,
  isEnumString,
  isTextarea,
} from "../deps.ts";
import type { Field, Select, Radio } from "../deps.ts";

const label = (d: Field) => html`<label for="${d.property}">${d.label || d.property}</label>`

const select = (d: Select) => {
  const isSelected = (v: string, i: number) => d.value && d.value === v
    ? true
    : i === 0
  return html`
    ${label(d)}
    <select name="${d.property}">
      ${d.options.map((opt, i) =>
        isEnumString(opt)
          ? html`<option value="${opt}" ${isSelected(opt, i) ? 'selected' : ''} >${opt}</option>`
          : html`<option value="${opt.value}" ${isSelected(opt.value, i) ? 'selected' : ''} >${opt.label}</option>`
      )}
    </select>
  `
}

const radio = (d: Radio) => {
  const isSelected = (v: string, i: number) => d.value && d.value === v
    ? true
    : i === 0
  return html`
    ${label(d)}
    ${d.options.map((opt, i) =>
      isEnumString(opt)
        ? html`
          <input type="radio" id="${opt}" name=${d.property} value="${opt}" ${isSelected(opt, i) ? 'checked' : ''} />
          <label for="${opt}">${opt}</label>
        `
        : html`
          <input type="radio" id="${opt.value}" name=${d.property} value="${opt.value}" ${isSelected(opt.value, i) ? 'checked' : ''} />
          <label for="${opt.value}">${opt.label}</label>
        `
    )}
  `
}

const getAttributes = ({ type, property, ...rest }: { type: string, property: string, [key: string]: any }) =>
  Object.keys(rest)
    .reduce(
      (r, key) => [...r, [key.toLowerCase(), rest[key]]],
      [['type', type], ['name', property]],
    )
    .map(([key, value]) =>
      key === 'notRequired'
        ? value ? 'required' : ''
        : `${key}="${value}"`
    )
    .join(' ')

export default (d: Field) => {
  if (isEnumField(d)) {
    return d.type === 'select' ? select(d) : radio(d)
  }
  if (isTextarea(d)) {
    return `
      ${label(d)}
      <textarea name="${d.property}" ${d.notRequired ? '' : 'required'}>${d.value || ''}</textarea>
    `
  }

  return html`
    ${label(d)}
    <input ${getAttributes(d)} />
  `
}

import { isCheckbox, isEnumField, isEnumString, isTextarea, html } from './deps.ts'
import type { Field, Radio, Select, SelectOption } from './deps.ts'
import { omit } from './utils.ts'

const isSelected = (v: string, i: number, value?: string) =>
  value ? value === v : i === 0;

const Label = ({ field }: { field: Field }) =>
  html`<label for="${field.property}">${field.label || field.property}</label>`

const getSelectOptionAttrs = (d: string | SelectOption, i: number, value?: string) =>
  isEnumString(d)
    ? { value: d, selected: isSelected(d, i, value) ? true : undefined }
    : {
      value: d.value,
      selected: isSelected(d.value, i, value) ? true : undefined,
    };

const SelectOptions = ({
  options,
  value,
}: { options: string[] | SelectOption[]; value?: string }) =>
  options.map((d, i) =>
    html`
      <option ${getSelectOptionAttrs(d, i, value)}>
        ${isEnumString(d) ? d : d.label}
      </option>
    `
  )

const SelectField = ({ field }: { field: Select }) =>
  html`
    <div class="field field-${field.type}">
      ${Label({ field })}
      <select>
        ${SelectOptions({ options: field.options, value: field.value })}
      </select>
    </div>
  `

const getRadioOptionAttrs = (
  property: string,
  option: string | SelectOption,
  index: number,
  value?: string,
) => ({
  type: "radio",
  name: property,
  ...(
    isEnumString(option)
      ? {
        id: option,
        value: option,
        checked: isSelected(option, index, value),
      }
      : {
        id: option.value,
        value: option.value,
        checked: isSelected(option.value, index, value),
      }
  )
})

const RadioOptions = ({
  property,
  options,
  value,
}: {
  property: string;
  options: string[] | SelectOption[];
  value?: string;
}) =>
  options.map((d, i) =>
    html`
      <div class="field-radio-option">
        <input ${getRadioOptionAttrs(property, d, i, value)} />
        <label for=${isEnumString(d) ? d : d.label}>
          ${isEnumString(d) ? d : d.label}
        </label>
      </div>  
    `
  )

const RadioField = ({ field }: { field: Radio }) => 
  html`
    <fieldset class="field field-${field.type}">
      <legend>${field.label || field.property}</legend>
      ${RadioOptions(field)}
    </fieldset>
  `

const getGenericAttributes = (
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
      ? SelectField({ field: d })
      : RadioField({ field: d});
  }

  if (isTextarea(d)) {
    const attrs = { name: d.property, required: d.notRequired ? undefined : true }
    return html`
      <div class="field field-${d.type}">
        ${Label({ field: d})}
        <textarea ${attrs}>
          ${d.value}
        </textarea>
      </div>
    `
  }

  if (isCheckbox(d)) {
    const attrs = {
      type: d.type,
      name: d.property,
      value: "true",
      checked: d.value ? true : undefined,
    }
    return html`
      <div class="field field-${d.type}">
        <input type="hidden" name="${d.property}" value="false"></input>
        <input ${attrs} />
        ${Label({ field: d })}
      </div>
    `
  }

  return html`
    <div class="field field-${d.type}">
      ${Label({ field: d })}
      <input ${getGenericAttributes(d)} />
    </div>
  `
};

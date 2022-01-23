interface BaseProps {
  property: string;
  label?: string;
}

interface TextProps extends BaseProps {
  pattern?: string;
  maxLength?: number;
  minLength?: number;
  value?: string;
  notRequired?: boolean;
  placeholder?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends BaseProps {
  options: SelectOption[] | string[];
  value?: string;
}

interface NumberProps extends BaseProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  notRequired?: boolean;
}

export interface Checkbox extends BaseProps {
  type: "checkbox";
  value?: boolean;
}

export interface Color extends BaseProps {
  type: "color";
  value?: string;
  notRequired?: boolean;
}

export interface Date extends BaseProps {
  type: "date";
  property: string;
  label?: string;
  min?: string;
  max?: string;
  value?: string;
  notRequired?: boolean;
}

export interface Email extends TextProps {
  type: "email";
}

export interface Number extends NumberProps {
  type: "number";
}

export interface Password extends TextProps {
  type: "password";
}

export interface Radio extends SelectProps {
  type: "radio";
}

export interface Range extends NumberProps {
  type: "range";
  min: number;
  max: number;
  step: number;
}

export interface Tel extends TextProps {
  type: "tel";
}

export interface Text extends TextProps {
  type: "text";
}

export interface Textarea extends BaseProps {
  type: "textarea";
  value?: string;
  notRequired?: boolean;
}

export interface Select extends SelectProps {
  type: "select";
}

export type TextField = Email | Password | Tel | Text;
export type NumericField = Number | Range;
export type EnumField = Radio | Select;

export type Field =
  | TextField
  | NumericField
  | EnumField
  | Checkbox
  | Color
  | Date
  | Textarea;

export const isTextField = (d: Field): d is TextField =>
  ["email", "password", "tel", "text"].includes(d.type);
export const isNumericField = (d: Field): d is NumericField =>
  ["number", "range"].includes(d.type);
export const isEnumField = (d: Field): d is EnumField =>
  ["radio", "select"].includes(d.type);
export const isCheckbox = (d: Field): d is Checkbox => d.type === "checkbox";
export const isColor = (d: Field): d is Color => d.type === "color";
export const isDate = (d: Field): d is Date => d.type === "date";
export const isTextarea = (d: Field): d is Textarea => d.type === "textarea";

export const isEnumString = (d: SelectOption | string): d is string =>
  String(d) === d;

/** @jsx h */
import { h } from "../deps.ts";
import "../types.d.ts";
import type { Table } from '../deps.ts'
import Component from './component.tsx'

interface ScriptProps {
  method: string
  redirectOnFail?: string
  redirectOnSuccess?: string
  table?: Partial<Table>
  url: string
}

interface Props extends ScriptProps {
  containerAttrs?: HTMLElementDivProps
  placeholder?: any
}

const FormBuilder = ({ containerAttrs, placeholder, ...props }: Props) =>
  <Component<ScriptProps>
    containerAttrs={containerAttrs}
    placeholder={placeholder}
    props={props}
    script="formBuilder"
  />

export default FormBuilder;

/** @jsx h */
import { h } from "../deps.ts";
import "../types.d.ts";

interface Props<T = any> {
  containerAttrs?: HTMLElementDivProps
  placeholder?: any
  props?: T
  script: string
}

const Component = <T,>({
  containerAttrs,
  placeholder,
  props,
  script,
}: Props<T>) => {
  const id = crypto.randomUUID()
  const el = `div_${id.split('-').join('')}`
  const js = [
    `const waitFor${script} = (sc, to, cb) => {let st = Date.now();const c = () => {if(window[sc]){return cb();};if(Date.now()-st>to){return cb();};setTimeout(c, 100);};c();}`,
    `waitFor${script}('${script}',5000,() => {${[
      `const ${el} = document.getElementById('${id}')`,
      `while(${el}.firstChild) { ${el}.removeChild(${el}.firstChild) }`,
      `${script}('${id}',${JSON.stringify(props || {})})`
    ].join(';')}})`,
  ].join(';')

  return (
    <div>
      <div id={id} {...(containerAttrs || {})}>{placeholder}</div>
      <script>{js}</script>
    </div>
  )
}

export default Component;

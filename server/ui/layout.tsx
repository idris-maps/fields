/** @jsx h */
import { h } from "../deps.ts";
import "../types.d.ts";
import If from "./if.tsx";
import Each from "./each.tsx";

interface Props {
  css?: string[];
  footer?: any;
  header?: any;
  js?: string[];
  main?: any;
}

const defaultCss = [
  "/assets/bonsai.core.css",
  '/assets/style.css'
];

export default ({
  css,
  footer,
  header,
  js,
  main,
}: Props) => (
  <html>
    <head>
      <meta charset="utf-8" />
      <Each<string>
        data={[...defaultCss, ...(css || [])]}
        render={(d) => <link rel="stylesheet" href={d} />}
      />
    </head>
    <body>
      <If condition={header} render={<header>{header}</header>} />
      <If condition={main} render={<main>{main}</main>} />
      <If condition={footer} render={<footer>{footer}</footer>} />
      <Each<string>
        data={[...(js || [])]}
        render={(d) => <script src={d}></script>}
      />
    </body>
  </html>
);

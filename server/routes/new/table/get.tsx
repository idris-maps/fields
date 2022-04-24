/** @jsx h */
import { h } from "../../../deps.ts";
import type { Handler } from "../../../local.ts";
import "../../../types.d.ts";
import Layout from "../../../ui/layout.tsx";
import FormBuilder from "../../../ui/form-builder.tsx";

const get: Handler = (req, res) =>
  res.jsx(
    <Layout
      css={['/assets/formBuilder.css']}
      js={['/assets/formBuilder.js']}
      main={<FormBuilder url="/" method="POST" />}
    />
  );

export default get

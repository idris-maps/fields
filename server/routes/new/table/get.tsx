/** @jsx h */
import { h } from "../../../deps.ts";
import type { Handler } from "../../../local.ts";
import "../../../types.d.ts";
import Layout from "../../../ui/layout.tsx";
import FormBuilder from "../../../ui/form-builder.tsx";

const Main = () =>
  <FormBuilder
    url="/api/tables"
    method="POST"
    redirectOnSuccess="/tables"
  />

const get: Handler = (req, res) =>
  res.jsx(
    <Layout
      css={['/assets/formBuilder.css']}
      js={['/assets/formBuilder.js']}
      main={<Main />}
    />
  );

export default get

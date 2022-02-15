import type { Handler } from "../../../local.ts";

const get: Handler = (req, res) =>
  res.file('assets/' + req.params.file);

export default get
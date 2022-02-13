import type { Handler } from "../../../../../local.ts";

const get: Handler = async (req, res, { meta }) =>
  res.json(await meta.getSchema(req.params.name));

export default get;

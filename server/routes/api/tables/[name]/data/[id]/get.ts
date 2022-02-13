import type { Handler } from "../../../../../../local.ts";

const get: Handler = async (req, res, { tables }) =>
  res.json(await tables.get(req.params.name, req.params.id));

export default get;

import type { Handler } from "../../../../../../local.ts";

const del: Handler = async (req, res, { tables }) =>
  res.json(await tables.delete(req.params.name, req.params.id));

export default del;

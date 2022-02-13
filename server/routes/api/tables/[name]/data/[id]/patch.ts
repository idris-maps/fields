import type { Handler } from "../../../../../../local.ts";

const patch: Handler = async (req, res, { tables }) =>
  res.json(await tables.patch(req.params.name, req.params.id, req.data));

export default patch;

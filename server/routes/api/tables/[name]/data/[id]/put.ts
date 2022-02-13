import type { Handler } from "../../../../../../local.ts";

const put: Handler = async (req, res, { tables }) =>
  res.json(await tables.put(req.params.name, req.params.id, req.data));

export default put;

import type { Handler } from "../../../../../local.ts";

const get: Handler = async (req, res, { tables }) =>
  res.json(
    await tables.getAll(req.params.name, req.query),
  );

export default get;

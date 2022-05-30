import type { Handler } from "../../../../../local.ts";

const get: Handler = async (req, res, { tables }) => {
  const { body, status } = await tables.getAll(req.params.name, req.query);
  return res.json(body, { status });
};

export default get;

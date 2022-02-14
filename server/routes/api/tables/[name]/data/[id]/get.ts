import type { Handler } from "../../../../../../local.ts";

const get: Handler = async (req, res, { tables }) => {
  const { status, body } = await tables.get(req.params.name, req.params.id);
  return res.json(body, { status });
};

export default get;

import type { Handler } from "../../../../../../local.ts";

const del: Handler = async (req, res, { tables }) => {
  const { status, body } = await tables.delete(req.params.name, req.params.id);
  return res.json(body, { status });
};

export default del;

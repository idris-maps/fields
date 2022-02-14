import type { Handler } from "../../../../../local.ts";

const get: Handler = async (req, res, { meta }) => {
  const { status, body } = await meta.getSchema(req.params.name)
  return res.json(body, { status });
}

export default get;

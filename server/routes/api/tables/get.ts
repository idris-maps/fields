import type { Handler } from "../../../local.ts";

const get: Handler = async (_, res, { meta }) => {
  const { status, body } = await meta.getAll();
  return res.json(body, { status })
}

export default get;

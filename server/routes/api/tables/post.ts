import type { Handler } from "../../../local.ts";

const post: Handler = async (req, res, { meta }) => {
  const { status, body } = await meta.post(req.data);
  return res.json(body, { status });
};

export default post;

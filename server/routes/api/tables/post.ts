import type { Handler } from "../../../local.ts";

const post: Handler = async (req, res, { meta }) =>
  res.json(await meta.post(req.data));

export default post;

import type { Handler } from "../local.ts";

const get: Handler = (req, res) => res.json(req.query);

export default get;

import type { Handler } from "../../../local.ts";

const get: Handler = async (_, res, { meta }) => res.json(await meta.getAll());

export default get;

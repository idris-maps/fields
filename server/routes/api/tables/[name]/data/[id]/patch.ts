import type { Handler } from "../../../../../../local.ts";

const patch: Handler = async (req, res, { tables }) => {
  const { status, body } = await tables.patch(
    req.params.name,
    req.params.id,
    req.data,
  );
  return res.json(body, { status });
};

export default patch;

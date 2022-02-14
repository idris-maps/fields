import type { Handler } from "../../../../../../local.ts";

const put: Handler = async (req, res, { tables }) => {
  const { status, body } = await tables.put(
    req.params.name,
    req.params.id,
    req.data,
  );
  return res.json(body, { status });
};

export default put;

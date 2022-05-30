import type { Handler } from "../../../../../local.ts";

const post: Handler = async (req, res, { tables }) => {
  const { status, body } = await tables.post(req.params.name, req.data);
  if (status !== 200) return res.json(body, { status });

  const redirect = req.query.redirect
    ? decodeURIComponent(req.query.redirect)
    : undefined;

  return redirect ? res.redirect(redirect) : res.json(body);
};

export default post;

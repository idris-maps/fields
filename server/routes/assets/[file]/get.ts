import type { Handler } from "../../../local.ts";

const assetsFolder = '../../../assets'

const get: Handler = (req, res, { utils }) => {
  const pathToAssets = utils.getRelativePath(import.meta, assetsFolder)
  return res.file(pathToAssets + "/" + req.params.file);
}

export default get;

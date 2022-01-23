import { isAlphaNumOrUnderscore, startsWithNum } from "./utils.ts";

const ERR = {
  notString: "table name must be a string",
  notDefined: "table name is undefined",
  notAlphaNum:
    "table name may only contain alpha numeric characters and _ (underscore)",
  startsWithUnderscore: "table name may not start with _ (underscore)",
  startsWithNumber: "table name may not start with a number",
};

const getTableNameError = (name: any) => {
  if (!name || String(name).trim() === "") {
    return ERR.notDefined;
  }
  if (name !== String(name)) {
    return ERR.notString;
  }
  if (!isAlphaNumOrUnderscore(name)) {
    return ERR.notAlphaNum;
  }
  if (startsWithNum(name)) {
    return ERR.startsWithNumber;
  }
  if (name[0] === "_") {
    return ERR.startsWithUnderscore;
  }
  return undefined;
};

export const validateTableName = (name: any) => {
  const err = getTableNameError(name);
  return err ? { isValid: false, errors: [err] } : { isValid: true };
};

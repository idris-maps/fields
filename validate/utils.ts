// ts any is type

export const isBoolean = (d: any): d is boolean =>
  ["true", "false"].includes(String(d));
export const isUndefined = (d: any): d is undefined =>
  typeof (d) === "undefined";
export const isString = (d: any): d is string => String(d) === d;
export const isNum = (d: any): d is number =>
  !isBoolean(d) &&
  !isString(d) &&
  !isUndefined(d) &&
  !Array.isArray(d) &&
  !Number.isNaN(Number(d));

// strings

export const isAlphaNumLetter = (d: string) =>
  "abcdefghijklmnopqrstuvwxyz0123456789".includes(d);
export const isAlphaNum = (d: string) => Array.from(d).every(isAlphaNumLetter);
export const fitsPattern = (pattern: string, d: string) =>
  new RegExp(pattern).test(d);
export const isDateString = (d: string) => {
  const [yyyy, mm, dd] = d.split("-");
  return Boolean(yyyy) && yyyy.length === 4 &&
    Boolean(mm) && mm.length === 2 &&
    Boolean(dd) && dd.length === 2 &&
    new Date(d).toString() !== "Invalid Date";
};

// numbers

export const isMultipleOf = (multiple: number, d: number) => {
  // account for 0.1 + 0.2 = 0.30000000000000004
  const multiplier = Math.pow(
    10,
    (String(multiple).split(".")[1] || "").length || 0,
  );
  return (d * multiplier) % (multiple * multiplier) === 0;
};

// ts any is type

export const isBoolean = (d: any): d is boolean =>
  ["true", "false"].includes(String(d));
export const isUndefined = (d: any): d is undefined =>
  typeof (d) === "undefined";
export const isString = (d: any): d is string => String(d) === d;
export const isNum = (d: any): d is number => !Number.isNaN(Number(d));

// strings

export const isAlphaNumLetter = (d: string) =>
  "abcdefghijklmnopqrstuvwxyz0123456789".includes(d);
export const isAlphaNum = (d: string) => Array.from(d).every(isAlphaNumLetter);
export const fitsPattern = (pattern: string, d: string) =>
  new RegExp(pattern).test(d);
export const isDateString = (d: string) => {
  const [yyyy, mm, dd] = d.split("-");
  return yyyy.length === 4 &&
    mm.length === 2 &&
    dd.length === 2 &&
    new Date(d).toString() !== "Invalid Date";
};

// numbers

export const isMultipleOf = (multiple: number, d: number) =>
  d % multiple < 0.0000000000001; // account for 0.1 + 0.2 = 0.30000000000000004

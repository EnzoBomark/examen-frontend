// If object exists in array (pop) else (push)
export const resign = <T>(arr: T[], obj: T, key: keyof T) =>
  arr.some((o) => obj[key] === o[key])
    ? arr.filter((o) => obj[key] !== o[key])
    : [...arr, obj];

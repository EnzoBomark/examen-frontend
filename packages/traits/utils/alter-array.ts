// Alter element in array of objects
export const alter = <T>(
  arr: T[],
  obj: T,
  key: keyof T,
  callback: (item: T) => Partial<T>
) => arr.map((i) => (i[key] === obj[key] ? { ...i, ...callback(i) } : i));

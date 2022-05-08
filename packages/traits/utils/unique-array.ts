// Return array of unique objects
export const unique = <T>(a: T | T[], b: T | T[], key: keyof T) => [
  ...new Map(
    [
      ...(Array.isArray(a) ? [...a] : [a]),
      ...(Array.isArray(b) ? [...b] : [b]),
    ].map((item) => [item[key], item])
  ).values(),
];

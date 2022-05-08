export const stringMatchArray = (arr: Array<string>, str: string) => {
  if (!str.length) return [];

  return arr
    .sort(
      (a, b) =>
        compare(b, str).reduce((acc: number, curr) => acc + (curr ? 1 : 0), 0) -
        compare(a, str).reduce((acc: number, curr) => acc + (curr ? 1 : 0), 0)
    )
    .reduce(
      (acc: ReadonlyArray<string>, curr) =>
        !compare(str, curr).some((i) => i === false) ? [...acc, curr] : acc,
      []
    );
};

export const compare = (a: string, b: string) =>
  a.split('').map((i) => b.toLowerCase().includes(i.toLowerCase()));

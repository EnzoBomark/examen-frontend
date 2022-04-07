import { v } from './validation';

type Validator = {
  validate: (str: string) => boolean;
  message: string;
};

export const validator = (str: string, ...criteria: Validator[]) =>
  [v.notEmpty, ...criteria].reduceRight(
    (messages: string | undefined, criterion) =>
      criterion.validate(str) ? criterion.message : messages,
    undefined
  );

type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown>
  ? K
  : never;

export const validate = <
  T extends Map<{ [key: string]: string | undefined }, Validator[]>,
  K extends KeyOfMap<T>
>(
  map: T,
  obj: { [Key in keyof K]: string }
) => {
  const keys = Array.from(map.keys());
  const entries = Array.from(map.entries());
  const hash = keys.map((i) => Object.keys(i)).flat();
  const tests = Object.entries(obj).map((e) => ({ [e[0]]: e[1] }));

  if (new Set(hash).size !== hash.length)
    throw new Error(`Map has duplicate keys, ${hash}`);

  const res = tests.map((test) => {
    const criteria = entries.find((i) => {
      return i.some((i) => Object.keys(i)[0] === Object.keys(test)[0]);
    });

    const value = keys.find((i) => {
      return Object.keys(i)[0] === Object.keys(test)[0];
    });

    return criteria
      ? validator(Object.values(value || {})[0] || '', ...criteria[1])
      : undefined;
  });

  const messages = res.filter((i) => i);

  return res.length <= 1 ? messages[0] : messages;
};

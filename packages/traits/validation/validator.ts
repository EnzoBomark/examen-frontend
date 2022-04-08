import { v } from './validation';

// Criteria
type Validator = {
  validate: (str: string) => boolean;
  message: string;
};

export const validator = (str: string, ...criteria: Validator[]) =>
  // Test string against array of criteria
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

  // Get entries of object and create iterable array of single object key value pairs
  const tests = Object.entries(obj).map((e) => ({ [e[0]]: e[1] }));

  // Create single dimension array of object keys
  const hash = keys.map((i) => Object.keys(i)).flat();

  // Compare set of hash size to original hash for duplicate keys
  if (new Set(hash).size !== hash.length)
    throw new Error(`Map has duplicate keys, ${hash}`);

  // Loop through each test
  const res = tests.map((test) => {
    // Get criteria from Map
    const criteria = entries.find((i) => {
      return i.some((i) => Object.keys(i)[0] === Object.keys(test)[0]);
    });

    // Get key value from Map
    const value = keys.find((i) => {
      return Object.keys(i)[0] === Object.keys(test)[0];
    });

    // Return first invalid result
    return criteria
      ? validator(Object.values(value || {})[0] || '', ...criteria[1])
      : undefined;
  });

  // Remove undefined values from array
  const messages = res.filter((i) => i);

  // Return string for single obj and array of strings for multi obj
  return res.length <= 1 ? messages[0] : messages;
};

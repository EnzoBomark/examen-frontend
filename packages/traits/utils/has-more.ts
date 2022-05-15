export const hasMore = (arr: unknown[]) =>
  !!arr.length && arr.length % 25 === 0;

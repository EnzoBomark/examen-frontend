import { createSelectorHook, TypedUseSelectorHook } from 'react-redux';

export function createUseSelector<State>({
  context,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any;
}): TypedUseSelectorHook<State> {
  return createSelectorHook(context) as TypedUseSelectorHook<State>;
}

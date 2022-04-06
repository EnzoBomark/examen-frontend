import { createSelectorHook, TypedUseSelectorHook } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createUseSelector<State>({
  context,
}: {
  context: any;
}): TypedUseSelectorHook<State> {
  return createSelectorHook(context) as TypedUseSelectorHook<State>;
}

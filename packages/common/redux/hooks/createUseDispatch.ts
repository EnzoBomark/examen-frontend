import { AnyAction } from 'redux';
import { createDispatchHook } from 'react-redux';

export type UseDispatch<Action extends AnyAction> = () => (
  action: Action
) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createUseDispatch<Action extends AnyAction = AnyAction>({
  context,
}: {
  context: any;
}): UseDispatch<Action> {
  return createDispatchHook(context) as UseDispatch<Action>;
}

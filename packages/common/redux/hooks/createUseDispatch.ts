import { AnyAction } from 'redux';
import { createDispatchHook } from 'react-redux';

export type UseDispatch<Action extends AnyAction> = () => (
  action: Action
) => void;

export function createUseDispatch<Action extends AnyAction = AnyAction>({
  context,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any;
}): UseDispatch<Action> {
  return createDispatchHook(context) as UseDispatch<Action>;
}

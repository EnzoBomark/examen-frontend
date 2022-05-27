import { Reducer, AnyAction, applyMiddleware, createStore, Store } from 'redux';
import { createComposeWithDevTools } from './createComposeWithDevTools';
import createFlipperDebugger from 'redux-flipper';

export function createReduxStore<State, Action extends AnyAction>({
  name,
  middleware,
  reducer,
}: {
  name: string;
  middleware: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  reducer: Reducer<State, Action>;
}): Store<State, Action> {
  if (__DEV__) {
    middleware.push(createFlipperDebugger());
  }
  const storeEnhancers = [applyMiddleware(...middleware)];
  return createComposeWithDevTools({ name })(...storeEnhancers)(createStore)(
    reducer
  ) as Store<State, Action>;
}

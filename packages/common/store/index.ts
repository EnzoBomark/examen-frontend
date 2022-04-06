import { AnyAction, Reducer, Middleware } from 'redux';
import { createReactReduxStoreWrapper } from '@racket-common/redux-wrapper';
import { createReduxStore } from './createReduxStore';

export function createStore<State, Action extends AnyAction>({
  name,
  middleware = [],
  reducer,
}: {
  name: string;
  middleware?: Middleware[];
  reducer: Reducer<State, Action>;
}) {
  const store = createReduxStore({
    name,
    middleware,
    reducer,
  });

  const boundStore = createReactReduxStoreWrapper<State, Action, typeof store>({
    name,
    store,
  });

  return boundStore;
}

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

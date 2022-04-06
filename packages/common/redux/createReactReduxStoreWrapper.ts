import { Action as ReduxAction, Store } from 'redux';
import { TypedUseSelectorHook, Connect } from 'react-redux';

import { createReduxContext } from './createReduxContext';
import { createConnect } from './higherOrderComponents/createConnect';
import { createUseDispatch, UseDispatch } from './hooks/createUseDispatch';
import { createUseSelector } from './hooks/createUseSelector';
import {
  createWithStore,
  WithStore,
} from './higherOrderComponents/createWithStore';

export interface ReactReduxStoreWrapper<
  State,
  Action extends ReduxAction,
  ReduxStore extends Store<State, Action>
> {
  connect: Connect;
  name: string;
  store: ReduxStore;
  useDispatch: UseDispatch<Action>;
  useSelector: TypedUseSelectorHook<State>;
  withStore: WithStore;
}

export interface CreateReactReduxStoreWrapperOptions<
  State,
  Action extends ReduxAction,
  ReduxStore extends Store<State, Action>
> {
  name: string;
  store: ReduxStore;
}

export function createReactReduxStoreWrapper<
  State,
  Action extends ReduxAction,
  ReduxStore extends Store<State, Action>
>({
  name,
  store,
}: CreateReactReduxStoreWrapperOptions<
  State,
  Action,
  ReduxStore
>): ReactReduxStoreWrapper<State, Action, ReduxStore> {
  const context = createReduxContext({ store });

  const connect = createConnect({ context });
  const useDispatch = createUseDispatch<Action>({ context });
  const useSelector = createUseSelector<State>({ context });
  const withStore = createWithStore({ context, name, store });

  return {
    name,
    store,
    connect,
    useDispatch,
    useSelector,
    withStore,
  };
}

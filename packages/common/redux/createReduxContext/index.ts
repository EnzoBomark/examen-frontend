import React from 'react';
import Subscription from './Subscription';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createReduxContext({ store }: { store: any }) {
  const subscription = new Subscription(store);
  subscription.onStateChange = subscription.notifyNestedSubs;

  const contextValue = {
    store,
    subscription,
  };

  return React.createContext(contextValue);
}

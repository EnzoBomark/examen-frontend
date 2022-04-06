import React, { useContext, Context } from 'react';
import { Provider, ReactReduxContextValue } from 'react-redux';

export function SingularStoreProvider({
  context,
  store,
  children,
}: {
  context: Context<ReactReduxContextValue<any, any>>; // eslint-disable-line @typescript-eslint/no-explicit-any
  store: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  children: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  const contextValue = useContext(context);
  if (contextValue && contextValue.store) {
    return children;
  }

  return (
    <Provider context={context} store={store}>
      {children}
    </Provider>
  );
}

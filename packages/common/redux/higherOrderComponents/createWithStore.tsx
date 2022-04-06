import React from 'react';

import { SingularStoreProvider } from '../components/SingularStoreProvider';

export function createWithStore({
  context,
  store,
  name,
}: {
  context: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  store: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  name: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function withStore<Component extends React.ComponentType<any>>(
    WrappedComponent: Component
  ) {
    const WithReactReduxStoreWrapper = (
      props: React.ComponentProps<Component>
    ) => {
      return (
        <SingularStoreProvider context={context} store={store}>
          <WrappedComponent {...props} />
        </SingularStoreProvider>
      );
    };

    WithReactReduxStoreWrapper.displayName = `reactReduxStoreWrapper[${name}].withStore`;

    return WithReactReduxStoreWrapper;
  };
}

export type WithStore = ReturnType<typeof createWithStore>;

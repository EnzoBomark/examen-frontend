import { compose } from 'redux';

export function createComposeWithDevTools({ name }: { name: string }) {
  const devToolsCompose = (global as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line @typescript-eslint/no-explicit-any

  return /* __DEV__ && */ !!devToolsCompose
    ? devToolsCompose({
        hostname: 'localhost',
        maxAge: 5000,
        name,
        port: 8001,
      })
    : compose;
}

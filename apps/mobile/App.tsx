/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { LogBox } from 'react-native';
import AppComp from '@racket-core/mobile';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'RCTBridge required dispatch_sync to load RNGestureHandlerModule. This may lead to deadlocks',
]);

const App: React.FC = () => {
  return <AppComp />;
};

export default App;

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from '@racket-native/auth';

export enum Screen {
  Auth = 'Auth',
}

export type AuthParamList = {
  [Screen.Auth]: undefined;
};

const Stack = createStackNavigator<AuthParamList>();

const options = { headerShown: false };

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screen.Auth} screenOptions={options}>
      <Stack.Screen name={Screen.Auth} component={Auth} />
    </Stack.Navigator>
  );
};

export default AuthStack;

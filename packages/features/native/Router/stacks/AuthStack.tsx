import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@racket-native/login';
import Register from '@racket-native/register';

export enum Screen {
  Login = 'Login',
  Register = 'Register',
}

export type AuthParamList = {
  [Screen.Login]: undefined;
  [Screen.Register]: undefined;
};

const Stack = createStackNavigator<AuthParamList>();

const options = { headerShown: false };

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screen.Login} screenOptions={options}>
      <Stack.Screen name={Screen.Login} component={Login} />
      <Stack.Screen name={Screen.Register} component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;

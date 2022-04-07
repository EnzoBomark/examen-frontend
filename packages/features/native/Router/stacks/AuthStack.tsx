import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@racket-native/login';
import Register from '@racket-native/register';

export type AuthParamList = {
  Login: undefined;
  Register: { name?: string; email?: string; phone?: string } | undefined;
};

const Stack = createStackNavigator<AuthParamList>();

const options = { headerShown: false };

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={options}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;

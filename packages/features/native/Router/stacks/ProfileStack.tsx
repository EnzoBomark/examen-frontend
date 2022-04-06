import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '@racket-native/profile';

export type ProfileParamList = {
  [Screen.Profile]: undefined;
};

const Stack = createStackNavigator<ProfileParamList>();

enum Screen {
  Profile = 'Profile',
}

const options = { headerShown: false };

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screen.Profile} screenOptions={options}>
      <Stack.Screen name={Screen.Profile} component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

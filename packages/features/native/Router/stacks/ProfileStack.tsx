import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '@racket-native/profile';

export type ProfileParamList = {
  Profile: undefined;
};

const Stack = createStackNavigator<ProfileParamList>();

const options = { headerShown: false };

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={options}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '@racket-native/profile';
import Settings from '@racket-native/settings';
import MatchHistory from '@racket-native/match-history';
import Centers from '@racket-native/centers';
import Center from '@racket-native/center';

export type ProfileParamList = {
  Profile: undefined;
  Settings: undefined;
  MatchHistory: undefined;
  Centers: undefined;
  Center: undefined;
};

const Stack = createStackNavigator<ProfileParamList>();

const options = { headerShown: false };

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={options}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="MatchHistory" component={MatchHistory} />
    <Stack.Screen name="Centers" component={Centers} />
    <Stack.Screen name="Center" component={Center} />
  </Stack.Navigator>
);

export default ProfileStack;

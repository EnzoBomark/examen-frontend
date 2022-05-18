import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '@racket-native/profile';
import Settings from '@racket-native/settings';
import Centers from '@racket-native/centers';
import Center from '@racket-native/center';
import Match from '@racket-native/match';
import Matches from '@racket-native/matches';
import UpcomingMatches from '@racket-native/upcoming-matches';
import MatchHistory from '@racket-native/match-history';
import Chat from '@racket-native/chat';

export type ProfileParamList = {
  Profile: undefined;
  Settings: undefined;
  Match: undefined;
  Matches: undefined;
  UpcomingMatches: undefined;
  MatchHistory: undefined;
  Centers: undefined;
  Center: undefined;
  Chat: undefined;
};

const Stack = createStackNavigator<ProfileParamList>();

const options = { headerShown: false };

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={options}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="MatchHistory" component={MatchHistory} />
    <Stack.Screen name="UpcomingMatches" component={UpcomingMatches} />
    <Stack.Screen name="Match" component={Match} />
    <Stack.Screen name="Matches" component={Matches} />
    <Stack.Screen name="Centers" component={Centers} />
    <Stack.Screen name="Center" component={Center} />
    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
);

export default ProfileStack;

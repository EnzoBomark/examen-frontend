import * as React from 'react';
import auth from '@react-native-firebase/auth';
import DrawerStack from './stacks/DrawerStack';
import MatchStack from './stacks/MatchStack';
import AuthStack from './stacks/AuthStack';
import ProfileStack from './stacks/ProfileStack';
import ChatStack from './stacks/ChatStack';
import { useProfile, useFetchProfile } from '@racket-traits/api/profile';
import { createStackNavigator } from '@react-navigation/stack';
import { useUnloadAppState } from '@racket-traits/api/core';
import { useChats, useFetchChats } from '@racket-traits/api/chat';

export type RootParamList = {
  DrawerStack: undefined;
  MatchStack: undefined;
  AuthStack: undefined;
  ProfileStack: undefined;
  ChatStack: undefined;
};

const Stack = createStackNavigator<RootParamList>();

const options = { headerShown: false };

const RootStack: React.FC = () => {
  const unloadAppState = useUnloadAppState();
  const fetchProfile = useFetchProfile();
  const fetchChats = useFetchChats();
  const chats = useChats();
  const profile = useProfile();

  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      user ? fetchProfile() : unloadAppState();
    });
  }, []);

  React.useEffect(() => {
    if (profile.hasLoaded && !chats.hasLoaded) fetchChats(chats.page);
  }, [profile]);

  return (
    <Stack.Navigator screenOptions={options}>
      {profile.hasLoaded && (
        <Stack.Group>
          <Stack.Screen name="DrawerStack" component={DrawerStack} />
          <Stack.Screen name="MatchStack" component={MatchStack} />
          <Stack.Screen name="ProfileStack" component={ProfileStack} />
          <Stack.Screen name="ChatStack" component={ChatStack} />
        </Stack.Group>
      )}

      {!profile.hasLoaded && (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;

import * as React from 'react';
import * as Hooks from '@racket-traits/hooks';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import DrawerStack from './stacks/DrawerStack';
import MatchStack from './stacks/MatchStack';
import AuthStack from './stacks/AuthStack';
import ProfileStack from './stacks/ProfileStack';
import ChatStack from './stacks/ChatStack';
import NotificationStack from './stacks/NotificationStack';
import { useProfile, useFetchProfile } from '@racket-traits/api/profile';
import { createStackNavigator } from '@react-navigation/stack';
import { useUnloadAppState } from '@racket-traits/api/core';
import {
  useChats,
  useFetchChats,
  useFetchLastMessages,
  useFetchReadStatus,
} from '@racket-traits/api/chat';
import {
  useFetchNotifications,
  useNotifications,
  useRefreshNotifications,
} from '@racket-traits/api/notifications';

export type RootParamList = {
  DrawerStack: undefined;
  MatchStack: undefined;
  AuthStack: undefined;
  ProfileStack: undefined;
  ChatStack: undefined;
  NotificationStack: undefined;
};

const Stack = createStackNavigator<RootParamList>();

const options = { headerShown: false };

const RootStack: React.FC = () => {
  const unloadAppState = useUnloadAppState();
  const fetchProfile = useFetchProfile();
  const fetchChats = useFetchChats();
  const fetchNotifications = useFetchNotifications();
  const refreshNotifications = useRefreshNotifications();
  const chats = useChats();
  const profile = useProfile();
  const notifications = useNotifications();
  const fetchLastMessages = useFetchLastMessages();
  const fetchReadStatus = useFetchReadStatus();

  Hooks.useInterval(() => {
    refreshNotifications();
  }, 300000);

  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      user ? fetchProfile() : unloadAppState();
    });
  }, []);

  React.useEffect(() => {
    if (profile.hasLoaded) {
      chats.data.forEach((chat) => {
        database()
          .ref(`/chat_rooms/${chat.id}`)
          .on('value', () => {
            fetchLastMessages(chat);
          });

        database()
          .ref(`/chat_rooms_status/${chat.id}`)
          .on('value', () => {
            fetchReadStatus(chat);
          });
      });

      return () => {
        chats.data.forEach((chat) => {
          database().ref(`/chat_rooms/${chat.id}`).off();
          database().ref(`/chat_rooms_status/${chat.id}`).off();
        });
      };
    }
  }, [profile.hasLoaded, chats.data.length]);

  React.useEffect(() => {
    if (profile.hasLoaded && !notifications.hasLoaded)
      fetchNotifications(notifications.page);
  }, [profile.hasLoaded]);

  React.useEffect(() => {
    if (profile.hasLoaded && !chats.hasLoaded) fetchChats(chats.page);
  }, [profile.hasLoaded]);

  return (
    <Stack.Navigator screenOptions={options}>
      {profile.hasLoaded && (
        <Stack.Group>
          <Stack.Screen name="DrawerStack" component={DrawerStack} />

          <Stack.Screen name="MatchStack" component={MatchStack} />

          <Stack.Screen name="ProfileStack" component={ProfileStack} />

          <Stack.Screen name="ChatStack" component={ChatStack} />

          <Stack.Screen
            name="NotificationStack"
            component={NotificationStack}
          />
        </Stack.Group>
      )}

      {!profile.hasLoaded && (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;

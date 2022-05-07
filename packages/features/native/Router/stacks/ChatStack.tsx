import database from '@react-native-firebase/database';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chats from '@racket-native/chats';
import Chat from '@racket-native/chat';
import {
  useChats,
  useFetchLastMessages,
  useFetchMessages,
} from '@racket-traits/api/chat';

export type ChatParamList = {
  Chats: undefined;
  Chat: undefined;
};

const Stack = createStackNavigator<ChatParamList>();

const ChatStack = () => {
  const chats = useChats();
  const fetchLastMessages = useFetchLastMessages();
  const fetchMessages = useFetchMessages();

  React.useEffect(() => {
    chats.data.forEach((chat) => {
      database()
        .ref(`/chat_rooms/${chat.id}`)
        .on('value', () => {
          fetchMessages(chat);
          fetchLastMessages(chat);
        });
    });

    return () => {
      chats.data.forEach((chat) => {
        database().ref(`/chat_rooms/${chat.id}`).off();
      });
    };
  }, [chats.data.length]);

  return (
    <Stack.Navigator
      initialRouteName="Chats"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Chats" component={Chats} />

      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default ChatStack;
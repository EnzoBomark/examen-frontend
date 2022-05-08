import database from '@react-native-firebase/database';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chats from '@racket-native/chats';
import Chat from '@racket-native/chat';
import CreateChat from '@racket-native/create-chat';
import {
  useChats,
  useFetchLastMessages,
  useFetchReadStatus,
} from '@racket-traits/api/chat';

export type ChatParamList = {
  Chats: undefined;
  Chat: undefined;
  CreateChat: undefined;
};

const Stack = createStackNavigator<ChatParamList>();

const ChatStack = () => {
  const chats = useChats();
  const fetchLastMessages = useFetchLastMessages();
  const fetchReadStatus = useFetchReadStatus();

  React.useEffect(() => {
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
  }, [chats.data.length]);

  return (
    <Stack.Navigator
      initialRouteName="Chats"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Chats" component={Chats} />

      <Stack.Screen name="Chat" component={Chat} />

      <Stack.Screen name="CreateChat" component={CreateChat} />
    </Stack.Navigator>
  );
};

export default ChatStack;

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chats from '@racket-native/chats';
import Chat from '@racket-native/chat';
import CreateChat from '@racket-native/create-chat';

export type ChatParamList = {
  Chats: undefined;
  Chat: undefined;
  CreateChat: undefined;
};

const Stack = createStackNavigator<ChatParamList>();

const ChatStack = () => {
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

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chats from '@racket-native/chats';
import Chat from '@racket-native/chat';

export type ChatParamList = {
  Chats: undefined;
  Chat: undefined;
};

const Stack = createNativeStackNavigator<ChatParamList>();

const ChatStack = () => (
  <Stack.Navigator
    initialRouteName="Chats"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Chats" component={Chats} />

    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
);

export default ChatStack;

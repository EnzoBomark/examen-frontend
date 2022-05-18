import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Notifications from '@racket-native/notifications';

export type NotificationParamList = {
  Notifications: undefined;
};

const Stack = createStackNavigator<NotificationParamList>();

const NotificationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Notifications"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
};

export default NotificationStack;

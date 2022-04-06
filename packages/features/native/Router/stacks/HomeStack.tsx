import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import Discover from '@racket-native/discover';
import Matches from '@racket-native/matches';

export enum Screen {
  Discover = 'Discover',
  Matches = 'Matches',
}

export type HomeParamList = {
  [Screen.Discover]: undefined;
  [Screen.Matches]: undefined;
};

const Stack = createNativeStackNavigator<HomeParamList>();

const HomeStack = () => {
  const pushPersmissionStatus = async () => {
    const hasPermission = await messaging().hasPermission();

    const enabled =
      hasPermission === messaging.AuthorizationStatus.AUTHORIZED ||
      hasPermission === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      await messaging().requestPermission({
        badge: true,
        sound: true,
      });
    }

    if (enabled) {
      // const token = await messaging().getToken();
      // Set the token in backend
    }
  };

  React.useEffect(() => {
    pushPersmissionStatus();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={Screen.Discover}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={Screen.Discover} component={Discover} />
      <Stack.Screen name={Screen.Matches} component={Matches} />
    </Stack.Navigator>
  );
};

export default HomeStack;

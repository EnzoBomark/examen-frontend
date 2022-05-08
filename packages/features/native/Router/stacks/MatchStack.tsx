import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import Discover from '@racket-native/discover';
import CreateMatch from '@racket-native/create-match';
import Match from '@racket-native/match';

export type MatchParamList = {
  Discover: undefined;
  CreateMatch: undefined;
  Match: undefined;
};

const Stack = createStackNavigator<MatchParamList>();

const MatchStack = () => {
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
      initialRouteName="Discover"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="CreateMatch" component={CreateMatch} />
      <Stack.Screen name="Match" component={Match} />
    </Stack.Navigator>
  );
};

export default MatchStack;

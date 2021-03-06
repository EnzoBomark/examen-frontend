import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import Discover from '@racket-native/discover';
import CreateMatch from '@racket-native/create-match';
import UpdateMatch from '@racket-native/update-match';
import Matches from '@racket-native/matches';
import UpcomingMatches from '@racket-native/upcoming-matches';
import MatchHistory from '@racket-native/match-history';
import Match from '@racket-native/match';
import Chat from '@racket-native/chat';
import Invite from '@racket-native/invite';

export type MatchParamList = {
  Discover: undefined;
  CreateMatch: undefined;
  UpdateMatch: undefined;
  Matches: undefined;
  UpcomingMatches: undefined;
  MatchHistory: undefined;
  Match: undefined;
  Chat: undefined;
  Invite: undefined;
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
      <Stack.Screen name="UpdateMatch" component={UpdateMatch} />
      <Stack.Screen name="MatchHistory" component={MatchHistory} />
      <Stack.Screen name="UpcomingMatches" component={UpcomingMatches} />
      <Stack.Screen name="Matches" component={Matches} />
      <Stack.Screen name="Match" component={Match} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Invite" component={Invite} />
    </Stack.Navigator>
  );
};

export default MatchStack;

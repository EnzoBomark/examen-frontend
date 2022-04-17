import * as React from 'react';
import auth from '@react-native-firebase/auth';
import DrawerStack from './stacks/DrawerStack';
import MatchStack from './stacks/MatchStack';
import AuthStack from './stacks/AuthStack';
import ProfileStack from './stacks/ProfileStack';
import {
  useProfile,
  useGetProfile,
  useUnloadProfile,
} from '@racket-traits/api/profile';
import { createStackNavigator } from '@react-navigation/stack';

export type RootParamList = {
  DrawerStack: undefined;
  MatchStack: undefined;
  AuthStack: undefined;
  ProfileStack: undefined;
};

const Stack = createStackNavigator<RootParamList>();

const options = { headerShown: false };

const RootStack: React.FC = () => {
  const unloadProfile = useUnloadProfile();
  const getProfile = useGetProfile();
  const profile = useProfile();

  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      user ? getProfile() : unloadProfile();
    });
  }, []);

  return (
    <Stack.Navigator screenOptions={options}>
      {profile.hasLoaded && (
        <Stack.Group>
          <Stack.Screen name="DrawerStack" component={DrawerStack} />
          <Stack.Screen name="MatchStack" component={MatchStack} />
          <Stack.Screen name="ProfileStack" component={ProfileStack} />
        </Stack.Group>
      )}

      {!profile.hasLoaded && (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;

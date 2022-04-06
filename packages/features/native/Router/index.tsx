import * as React from 'react';
import * as Native from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import DrawerStack from './stacks/DrawerStack';
import HomeStack from './stacks/HomeStack';
import AuthStack from './stacks/AuthStack';
import ProfileStack from './stacks/ProfileStack';

export type RootParamList = {
  [Screen.DrawerStack]: undefined;
  [Screen.HomeStack]: undefined;
  [Screen.AuthStack]: undefined;
  [Screen.ProfileStack]: undefined;
};

const Stack = createStackNavigator<RootParamList>();

enum Screen {
  DrawerStack = 'DrawerStack',
  HomeStack = 'HomeStack',
  AuthStack = 'AuthStack',
  ProfileStack = 'ProfileStack',
}

const options = { headerShown: false };

const RootStack: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);

  const loadProfile = () => {
    auth().onAuthStateChanged((user) => {
      if (user) setUser(user);
      if (!user) setUser(null);
      if (isLoading) setIsLoading(false);
    });
  };

  React.useEffect(() => {
    loadProfile();
  }, []);

  if (isLoading)
    return (
      <Native.SafeAreaView>
        <Native.ActivityIndicator />
      </Native.SafeAreaView>
    );

  return (
    <Stack.Navigator screenOptions={options}>
      {!user && (
        <Stack.Group>
          <Stack.Screen name={Screen.DrawerStack} component={DrawerStack} />
          <Stack.Screen name={Screen.HomeStack} component={HomeStack} />
          <Stack.Screen name={Screen.ProfileStack} component={ProfileStack} />
        </Stack.Group>
      )}

      {user && <Stack.Screen name={Screen.AuthStack} component={AuthStack} />}
    </Stack.Navigator>
  );
};

export default RootStack;

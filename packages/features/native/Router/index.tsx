import * as React from 'react';
import * as Native from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AuthStack from './stacks/AuthStack';

export type RootParamList = {
  [Screen.AuthStack]: undefined;
};

const Stack = createStackNavigator<RootParamList>();

enum Screen {
  AuthStack = 'AuthStack',
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
      {/* {!user && <Stack.Group></Stack.Group>} */}

      {user && <Stack.Screen name={Screen.AuthStack} component={AuthStack} />}
    </Stack.Navigator>
  );
};

export default RootStack;

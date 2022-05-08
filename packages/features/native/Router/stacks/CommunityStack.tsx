import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useFetchUsers, useUsers } from '@racket-traits/api/user';
import Community from '@racket-native/community';

export type CommunityParamList = {
  Community: undefined;
};

const Stack = createStackNavigator<CommunityParamList>();

const CommunityStack = () => {
  const users = useUsers();
  const fetchUsers = useFetchUsers();

  React.useEffect(() => {
    if (!users.hasLoaded) fetchUsers(users.page);
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Community"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Community" component={Community} />
    </Stack.Navigator>
  );
};

export default CommunityStack;

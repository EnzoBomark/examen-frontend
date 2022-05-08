import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import theme from '@racket-styles/core/theme';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import MatchStack from './MatchStack';
import ProfileStack from './ProfileStack';
import ChatStack from './ChatStack';

export type DrawerParamList = {
  MatchStack: undefined;
  ProfileStack: undefined;
  ChatStack: undefined;
};

const Drawer = createDrawerNavigator();

const icons = (color: keyof theme['colors']) => ({
  MatchStack: <S.Svg src="house" width="24px" color={color} />,
  ProfileStack: <S.Svg src="profile" width="24px" color={color} />,
  ChatStack: <S.Svg src="chat" width="24px" color={color} />,
});

type ScreenOptions = { route: RouteProp<ParamListBase, string> };

const BottomTabs = () => (
  <Drawer.Navigator
    screenOptions={({ route }: ScreenOptions) => ({
      headerShown: false,
      drawerLabelStyle: { marginLeft: -20 },
      drawerInactiveTintColor: theme.colors.g400,
      drawerActiveTintColor: theme.colors.p600,
      drawerIcon: ({ color }: { color: string }) =>
        icons(color as keyof theme['colors'])[route.name as keyof typeof icons],
    })}
    drawerContent={(props) => <C.Drawer {...props} />}
  >
    <Drawer.Screen
      name="MatchStack"
      component={MatchStack}
      options={{ title: 'Discover' }}
    />

    <Drawer.Screen
      name="ProfileStack"
      component={ProfileStack}
      options={{ title: 'Profile' }}
    />

    <Drawer.Screen
      name="ChatStack"
      component={ChatStack}
      options={{ title: 'Chat' }}
    />
  </Drawer.Navigator>
);

export default BottomTabs;

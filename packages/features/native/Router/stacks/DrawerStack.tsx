import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import theme from '@racket-styles/core/theme';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';

export enum Stack {
  HomeStack = 'HomeStack',
  ProfileStack = 'ProfileStack',
}

export type DrawerParamList = {
  [Stack.HomeStack]: undefined;
  [Stack.ProfileStack]: undefined;
};

const Drawer = createDrawerNavigator();

const icons = (color: keyof theme['colors']) => ({
  [Stack.HomeStack]: <S.Svg src="homeFill" width="26px" color={color} />,
  [Stack.ProfileStack]: <S.Svg src="profileFill" width="26px" color={color} />,
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
        icons(color as keyof theme['colors'])[route.name as Stack],
    })}
    drawerContent={(props) => <C.Drawer {...props} />}
  >
    <Drawer.Screen
      name={Stack.HomeStack}
      component={HomeStack}
      options={{ title: 'Discover' }}
    />

    <Drawer.Screen
      name={Stack.ProfileStack}
      component={ProfileStack}
      options={{ title: 'Profile' }}
    />
  </Drawer.Navigator>
);

export default BottomTabs;

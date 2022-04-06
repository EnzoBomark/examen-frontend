import * as React from 'react';
import * as Native from 'react-native';
import * as S from '@racket-styles/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import theme from '@racket-styles/core/theme';
import Images from '@racket-styles/assets/images';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export enum Stack {
  HomeStack = 'HomeStack',
  ProfileStack = 'ProfileStack',
}

export type DrawerParamList = {
  [Stack.HomeStack]: undefined;
  [Stack.ProfileStack]: undefined;
};

const Drawer = createDrawerNavigator();

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const insets = useSafeAreaInsets();

  return (
    <Native.View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: theme.colors.p800,
        }}
      >
        <Native.ImageBackground source={Images.drawer}>
          <S.Padding size="xs">
            <S.Image src="TEST" width="80px" border="xxl" />
            <S.Spacer size="xxs" />
            <S.H3 color="g0">Jane Doe</S.H3>
            <S.Spacer size="xxs" />
            <S.Row>
              <S.Svg src="star" width="14px" />
              <S.Spacer size="xxs" />
              <S.Body color="g0">420 Matches</S.Body>
            </S.Row>
          </S.Padding>
        </Native.ImageBackground>
        <Native.View style={{ flex: 1, backgroundColor: theme.colors.g0 }}>
          <S.Spacer size="xs" />
          <DrawerItemList {...props} />
          <S.Spacer size="xs" />
        </Native.View>
      </DrawerContentScrollView>

      <Native.View style={{ paddingBottom: insets.bottom }}>
        <S.UnderLine />
        <S.Padding size="s">
          <S.Clickable>
            <S.Row>
              <S.Svg src="share" width="18px" color="g1000" />
              <S.Spacer size="xxs" />
              <S.Body color="g1000">Share with friends</S.Body>
            </S.Row>

            <S.Spacer size="s" />

            <S.Row>
              <S.Svg src="sad" width="18px" color="g1000" />
              <S.Spacer size="xxs" />
              <S.Body color="g1000">Logout</S.Body>
            </S.Row>
          </S.Clickable>
        </S.Padding>
      </Native.View>
    </Native.View>
  );
};

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
    drawerContent={(props) => <CustomDrawer {...props} />}
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

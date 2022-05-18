import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import theme from '@racket-styles/core/theme';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import MatchStack from './MatchStack';
import ProfileStack from './ProfileStack';
import ChatStack from './ChatStack';
import CommunityStack from './CommunityStack';
import NotificationStack from './NotificationStack';
import { useChatFunctions, useChats } from '@racket-traits/api/chat';
import { useNotifications } from '@racket-traits/api/notifications';

export type DrawerParamList = {
  MatchStack: undefined;
  ProfileStack: undefined;
  ChatStack: undefined;
  CommunityStack: undefined;
  NotificationStack: undefined;
};

const Drawer = createDrawerNavigator();

type ScreenOptions = { route: RouteProp<ParamListBase, string> };

const BottomTabs = () => {
  const { getReadStatus } = useChatFunctions();
  const chats = useChats();
  const notifications = useNotifications();

  const isChatActive = chats.data
    .filter((chat) => chat.users.length > 1)
    .some((c) => !getReadStatus(c));

  const isNotificationsActive = notifications.data.some((n) => !n.isRead);

  const icons = (color: keyof theme['colors']) => ({
    MatchStack: <S.Svg src="house" width="24px" color={color} />,
    ProfileStack: <S.Svg src="profile" width="24px" color={color} />,
    CommunityStack: <S.Svg src="community" width="24px" color={color} />,
    ChatStack: (
      <S.Svg
        src={isChatActive ? 'chatActive' : 'chat'}
        width="24px"
        color={color}
      />
    ),
    NotificationStack: (
      <S.Svg
        src={isNotificationsActive ? 'notificationActive' : 'notification'}
        width="24px"
        color={color}
      />
    ),
  });

  return (
    <Drawer.Navigator
      screenOptions={({ route }: ScreenOptions) => ({
        headerShown: false,
        drawerLabelStyle: { marginLeft: -20 },
        drawerInactiveTintColor: theme.colors.g400,
        drawerActiveTintColor: theme.colors.p600,
        drawerIcon: ({ color }) =>
          icons(color as keyof theme['colors'])[
            route.name as keyof typeof icons
          ],
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

      <Drawer.Screen
        name="CommunityStack"
        component={CommunityStack}
        options={{ title: 'Community' }}
      />

      <Drawer.Screen
        name="NotificationStack"
        component={NotificationStack}
        options={{ title: 'Notifications' }}
      />
    </Drawer.Navigator>
  );
};

export default BottomTabs;

import * as React from 'react';
import * as S from '@racket-styles/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { NotificationParamList } from '@racket-native/router/stacks/NotificationStack';
import {
  useFetchNotifications,
  useNotifications,
  useRefreshNotifications,
} from '@racket-traits/api/notifications';

type Props = DrawerScreenProps<NotificationParamList, 'Notifications'>;

const Notifications: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const notifications = useNotifications();
  const fetchNotifications = useFetchNotifications();
  const reloadNotifications = useRefreshNotifications();

  React.useEffect(() => {
    if (!notifications.hasLoaded) fetchNotifications(notifications.page);
  }, []);

  return (
    <React.Fragment>
      <S.List
        underline
        fullScreen
        headerHeight={headerHeight}
        onEndReached={() => fetchNotifications(notifications.page)}
        onRefresh={reloadNotifications}
        keyExtractor={(item) => item.id}
        data={notifications.data}
        renderItem={({ item }) => <S.Body>{item.id}</S.Body>}
      />

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Clickable onPress={() => navigation.openDrawer()}>
            <S.Svg src="hamburger" width="24px" color="g1000" />
          </S.Clickable>
        </S.Padding>
      </S.Header>
    </React.Fragment>
  );
};

export default Notifications;

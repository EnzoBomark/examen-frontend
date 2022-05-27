import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { NotificationParamList } from '@racket-native/router/stacks/NotificationStack';
import { useFocusEffect } from '@react-navigation/native';
import { useUpdateStatus } from '@racket-traits/api/notifications/creators/updateStatus';
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
  const refreshNotifications = useRefreshNotifications();
  const updateStatus = useUpdateStatus();

  useFocusEffect(
    React.useCallback(() => {
      updateStatus();
    }, [])
  );

  const emptyList = (
    <C.EmptyListReload
      title="Oh no!"
      message="Seems like you don't have any notifications"
      onPress={refreshNotifications}
      headerHeight={headerHeight}
      loading={notifications.isLoading}
    />
  );

  return (
    <React.Fragment>
      <S.List
        underline
        fullScreen
        headerHeight={headerHeight}
        ListEmptyComponent={emptyList}
        onEndReached={() => fetchNotifications(notifications.page)}
        onRefresh={refreshNotifications}
        keyExtractor={(item) => item.id}
        data={notifications.data}
        renderItem={({ item }) => <C.NotificationCard {...item} />}
      />

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Clickable onPress={() => navigation.openDrawer()}>
            <S.Svg src="hamburger" width="24px" color="g1000" />
          </S.Clickable>
        </S.Padding>

        {notifications.isLoading && <S.LoadingBar />}
      </S.Header>
    </React.Fragment>
  );
};

export default Notifications;

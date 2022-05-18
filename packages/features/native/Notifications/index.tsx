import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import * as Hooks from '@racket-traits/hooks';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { NotificationParamList } from '@racket-native/router/stacks/NotificationStack';
import {
  useFetchNotifications,
  useNotifications,
  useRefreshNotifications,
} from '@racket-traits/api/notifications';
import { useFocusEffect } from '@react-navigation/native';
import { useUpdateStatus } from '@racket-traits/api/notifications/creators/updateStatus';

type Props = DrawerScreenProps<NotificationParamList, 'Notifications'>;

const Notifications: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const notifications = useNotifications();
  const fetchNotifications = useFetchNotifications();
  const refreshNotifications = useRefreshNotifications();
  const updateStatus = useUpdateStatus();
  const showLoadingBar = Hooks.useDelay(notifications.isLoading, 2100);

  useFocusEffect(
    React.useCallback(() => {
      updateStatus();
    }, [])
  );

  return (
    <React.Fragment>
      {!!notifications.data.length ? (
        <S.List
          underline
          fullScreen
          headerHeight={headerHeight}
          onEndReached={() => fetchNotifications(notifications.page)}
          onRefresh={refreshNotifications}
          keyExtractor={(item) => item.id}
          data={notifications.data}
          renderItem={({ item }) => <C.NotificationCard {...item} />}
        />
      ) : (
        <C.EmptyListReload
          title="Oh no!"
          message="Seems like you don't have any notifications"
          onPress={refreshNotifications}
          headerHeight={headerHeight}
        />
      )}

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Clickable onPress={() => navigation.openDrawer()}>
            <S.Svg src="hamburger" width="24px" color="g1000" />
          </S.Clickable>
        </S.Padding>

        {showLoadingBar && <S.LoadingBar />}
      </S.Header>
    </React.Fragment>
  );
};

export default Notifications;

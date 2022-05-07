import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {
  useFetchChats,
  useChats,
  useRefreshChats,
  useSetChat,
  useResignChat,
} from '@racket-traits/api/chat';
import { ChatParamList } from '@racket-native/router/stacks/ChatStack';

type Props = DrawerScreenProps<ChatParamList, 'Chats'>;

const Chats: React.FC<Props> = ({ navigation }) => {
  const chats = useChats();
  const fetchChats = useFetchChats();
  const resignChat = useResignChat();
  const setChat = useSetChat();
  const refreshChats = useRefreshChats();
  const [headerHeight, setHeaderHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (!chats.hasLoaded) fetchChats(chats.page);
  }, []);

  return (
    <React.Fragment>
      <S.List
        headerHeight={headerHeight}
        onEndReached={() => fetchChats(chats.page)}
        onRefresh={refreshChats}
        data={chats.data}
        renderItem={({ item }) => <C.ChatCard {...item} />}
        fullScreen={true}
        spacer="xxs"
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

export default Chats;

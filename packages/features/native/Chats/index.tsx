import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {
  useFetchChats,
  useChats,
  useRefreshChats,
  useChatFunctions,
} from '@racket-traits/api/chat';
import { ChatParamList } from '@racket-native/router/stacks/ChatStack';

type Props = DrawerScreenProps<ChatParamList, 'Chats'>;

const Chats: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const chats = useChats();
  const fetchChats = useFetchChats();
  const refreshChats = useRefreshChats();
  const { sortChats } = useChatFunctions();
  const [query, setQuery] = React.useState('');

  return (
    <React.Fragment>
      <S.List
        headerHeight={headerHeight}
        onEndReached={() => fetchChats(chats.page)}
        onRefresh={() => refreshChats()}
        data={sortChats(chats.data, query)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <C.ChatCard {...item} />}
        fullScreen={true}
        spacer="xxs"
      />

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Row justify="between">
            <S.Clickable onPress={() => navigation.openDrawer()}>
              <S.Svg src="hamburger" width="24px" color="g1000" />
            </S.Clickable>

            <S.Clickable onPress={() => navigation.navigate('CreateChat')}>
              <S.Svg src="addChat" width="24px" color="g1000" />
            </S.Clickable>
          </S.Row>

          <S.Spacer size="s" />

          <S.TextInput
            placeholder="Search"
            height="38px"
            icon="search"
            value={query}
            onTextChange={setQuery}
          />
        </S.Padding>
      </S.Header>
    </React.Fragment>
  );
};

export default Chats;

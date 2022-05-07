import database from '@react-native-firebase/database';
import * as React from 'react';
import * as Native from 'react-native';
import * as Hooks from '@racket-traits/hooks';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { formatMessages } from '@racket-traits/misc';
import {
  useChat,
  useFetchMessages,
  useMarkAsRead,
} from '@racket-traits/api/chat';
import { StackScreenProps } from '@react-navigation/stack';
import { ChatParamList } from '@racket-native/router/stacks/ChatStack';
import { useTranslation } from '@racket-traits/lang';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = StackScreenProps<ChatParamList, 'Chat'>;

const Chat: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { chat: t } = useTranslation();
  const chat = useChat();
  const markAsRead = useMarkAsRead();
  const fetchMessages = useFetchMessages();
  const [headerHeight, setHeaderHeight] = React.useState<number>(0);

  // Poll update read status every min
  Hooks.useInterval(() => markAsRead(), 10_000);

  // Create firebase chat listener for messages
  React.useEffect(() => {
    markAsRead();
    fetchMessages(chat.data);

    return () => {
      markAsRead();
    };
  }, []);

  return (
    <React.Fragment>
      <S.Background color="g0">
        <S.List
          inverted
          padding={4}
          spacer="xxs"
          headerHeight={headerHeight}
          data={formatMessages(chat.data)}
          onEndReached={() => fetchMessages(chat.data)}
          renderItem={({ item }) => <C.ChatBubble {...item} />}
        />
      </S.Background>

      <Native.KeyboardAvoidingView
        behavior={Native.Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={
          Native.Platform.OS === 'ios' ? -insets.bottom : 0
        }
      >
        <C.Input />
      </Native.KeyboardAvoidingView>

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Align type="center">
            <S.Absolute left="0">
              <S.Clickable onPress={() => navigation.navigate('Chats')}>
                <S.Svg src="leftArrow" width="20px" color="g1000" />
              </S.Clickable>
            </S.Absolute>

            <S.H5>{chat.data.users.map((u) => u.name).join(', ')}</S.H5>
            <S.Detail color="g500">
              {chat.data.users?.length}{' '}
              {chat.data.users?.length === 1 ? t.member : t.members}
            </S.Detail>

            <S.Absolute right="0">
              <S.Clickable>
                <S.Svg src="info" width="20px" color="g1000" />
              </S.Clickable>
            </S.Absolute>
          </S.Align>
        </S.Padding>
      </S.Header>
    </React.Fragment>
  );
};

export default Chat;

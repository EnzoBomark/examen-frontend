import * as React from 'react';
import * as Native from 'react-native';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import {
  useChat,
  useChatFunctions,
  useFetchMessages,
  useMarkAsRead,
  useResignChat,
  useUnloadChat,
} from '@racket-traits/api/chat';
import { StackScreenProps } from '@react-navigation/stack';
import { ChatParamList } from '@racket-native/router/stacks/ChatStack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = StackScreenProps<ChatParamList, 'Chat'>;

const Chat: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const insets = useSafeAreaInsets();
  const chat = useChat();
  const unloadChat = useUnloadChat();
  const markAsRead = useMarkAsRead();
  const resignChat = useResignChat();
  const fetchMessages = useFetchMessages();
  const { getLabel, getMemberCount, formatMessages } = useChatFunctions();

  React.useEffect(() => {
    if (!chat.hasLoaded) navigation.navigate('Chats');
  }, [chat]);

  React.useEffect(() => {
    if (chat.data.messages.length) fetchMessages(chat.data);
  }, [chat.data]);

  React.useEffect(() => {
    markAsRead();
  }, [chat.data.messages.length]);

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
              <S.Clickable onPress={unloadChat}>
                <S.Svg src="leftArrow" width="20px" color="g1000" />
              </S.Clickable>
            </S.Absolute>

            <S.H5>{getLabel(chat.data)}</S.H5>
            <S.Detail color="g500">{getMemberCount(chat.data)}</S.Detail>

            <S.Absolute right="0">
              <S.Clickable
                onPress={() => {
                  resignChat(chat.data);
                }}
              >
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

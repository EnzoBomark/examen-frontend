import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ChatParamList } from '@racket-native/router/stacks/ChatStack';
import { useChatFunctions, useSetChat } from '@racket-traits/api/chat';
import { getTime, getDate } from '@racket-traits/misc';

const Card = styled.View`
  flex: 1;
  height: 56px;
  width: 100%;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
  padding: 10px 12px;
  flex-direction: row;
`;

const Bottom = styled.View`
  width: 100%;
  border-bottom-left-radius: ${theme.radius.xs};
  border-bottom-right-radius: ${theme.radius.xs};
  background-color: ${theme.colors.g50};
`;

const Message = styled(S.Detail)`
  margin-top: 2px;
  margin-right: auto;
  max-width: 70%;
`;

const Date = styled(S.Detail)`
  margin-left: auto;
  margin-top: 2px;
`;

const Dot = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 10px;
  background-color: ${theme.colors.p600};
`;

type Navigation = StackNavigationProp<ChatParamList, 'Chats'>;

export const ChatCard: React.FC<Chat> = (chat) => {
  const setChat = useSetChat();
  const navigation = useNavigation<Navigation>();
  const {} = useChatFunctions();

  return (
    <S.Clickable
      onPress={() => {
        setChat(chat);
        navigation.navigate('Chat');
      }}
    >
      <Card style={{ ...theme.shadow }}>
        <S.Image
          border="xxl"
          src="https://d2ihp3fq52ho68.cloudfront.net/YTo2OntzOjI6ImlkIjtpOjEzNDM5NzE7czoxOiJ3IjtpOjQ4MDtzOjE6ImgiO2k6MzIwMDtzOjE6ImMiO2k6MDtzOjE6InMiO2k6MDtzOjE6ImsiO3M6NDA6IjUyZTRiMDg0MWRhOTAxODJlNzIyZjRmNjAxYTU1OWI2ODAwZWZlOGQiO30="
          width="34px"
        />

        <S.Spacer size="xs" />

        <S.Col>
          <S.Label color="g1000">
            {chat.users.map((u) => u.name).join(', ')}
          </S.Label>

          {!!chat.messages.length ? (
            <S.Row style={{ width: '100%' }}>
              <Message color="g400" numberOfLines={1}>
                {chat.messages[0]?.message}
              </Message>

              <S.Spacer size="xxs" />

              <Date color="g400" numberOfLines={1}>
                {getTime(chat.messages[0]?.time)}{' '}
                {getDate(chat.messages[0]?.time)}
              </Date>
            </S.Row>
          ) : (
            <Message color="g400" numberOfLines={1}>
              New chat
            </Message>
          )}
        </S.Col>
      </Card>
    </S.Clickable>
  );
};

import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ChatParamList } from '@racket-native/router/stacks/ChatStack';
import { useChatFunctions, useSetChat } from '@racket-traits/api/chat';
import { getTime, getDate } from '@racket-traits/utils';
import { profileSelector } from '@racket-traits/api/profile/selectors';
import { useProfile } from '@racket-traits/api/profile';

const Card = styled.View`
  height: 56px;
  width: 100%;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
  padding: 10px 12px;
  flex-direction: row;
`;

const Message = styled(S.Detail)`
  margin-top: 2px;
  margin-right: auto;
  max-width: 70%;
`;

const TitleWrapper = styled.View`
  overflow: hidden;
  width: 95%;
`;

const Date = styled(S.Detail)`
  margin-left: auto;
  margin-top: 2px;
`;

const Images = styled.View<{ number: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  justify-content: center;
  left: ${({ number }) => 6 * number + 10}px;
`;

const ImageSpacer = styled.View<{ number: number }>`
  width: ${({ number }) => 6 * number + 12}px;
`;

const ImageBorder = styled.View`
  padding: 1px;
  background-color: ${theme.colors.p100};
  border-radius: ${theme.radius.xxl};
`;

const Dot = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 10px;
  background-color: ${theme.colors.p600};
`;

type Navigation = StackNavigationProp<ChatParamList, 'Chats'>;

export const ChatCard: React.FC<Chat> = (chat) => {
  const profile = useProfile();
  const setChat = useSetChat();
  const navigation = useNavigation<Navigation>();
  const { getLabel, getPrefix, getReadStatus } = useChatFunctions();

  const userImages = chat.users
    .filter((user) => user.id !== profile.data.id)
    .slice(0, 3);

  return (
    <S.Clickable
      onPress={() => {
        setChat(chat);
        navigation.navigate('Chat');
      }}
    >
      <Card style={{ ...theme.shadow }}>
        {userImages.map((user, index) => (
          <Images number={index}>
            <ImageBorder>
              <S.ProfilePicture
                key={user.id}
                border="xxl"
                user={user}
                width="34px"
              />
            </ImageBorder>
          </Images>
        ))}

        <ImageSpacer number={userImages.length} />

        <S.Absolute top="8px" left="8px">
          {!getReadStatus(chat) && <Dot />}
        </S.Absolute>

        <S.Spacer size="s" />

        <S.Col>
          <TitleWrapper>
            <S.Label color="g1000" numberOfLines={1}>
              {getLabel(chat)}
            </S.Label>
          </TitleWrapper>

          {!!chat.messages.length ? (
            <S.Row style={{ width: '100%' }}>
              <Message color="g400" numberOfLines={1}>
                {getPrefix(chat.messages[0], chat.users)}
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

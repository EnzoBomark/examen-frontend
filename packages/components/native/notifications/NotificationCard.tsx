import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { useFetchMatch } from '@racket-traits/api/match';

const Card = styled.View`
  height: 56px;
  width: 100%;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
  padding: 10px 12px;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(S.Label)`
  width: 60%;
`;

const isFollowNotification = (
  i: CombinedNotification
): i is FollowNotification => i.type === 'follow';

const isInviteNotification = (
  i: CombinedNotification
): i is InviteNotification => i.type === 'invite';

const isResultNotification = (
  i: CombinedNotification
): i is ResultNotification => i.type === 'result';

export const NotificationCard: React.FC<CombinedNotification> = (
  notification
) => {
  const fetchMatch = useFetchMatch();

  return (
    <Card style={{ ...theme.shadow }}>
      {(isFollowNotification(notification) ||
        isInviteNotification(notification)) && (
        <React.Fragment>
          <S.ProfilePicture
            user={notification.sender}
            width="36px"
            border="xxs"
          />

          <S.Spacer size="xs" />
        </React.Fragment>
      )}

      {isFollowNotification(notification) && (
        <Title color="g1000" numberOfLines={1}>
          {notification.sender?.name} started following you
        </Title>
      )}

      {isInviteNotification(notification) && (
        <Title color="g1000" numberOfLines={1}>
          {notification.sender?.name} invited you to a game
        </Title>
      )}

      {isResultNotification(notification) && (
        <Title color="g1000" numberOfLines={1}>
          New match result!
        </Title>
      )}

      <S.Fill />

      {isInviteNotification(notification) && (
        <S.SmallButton
          onPress={() => fetchMatch(notification.match as Match)}
          height="30px"
          label={'Join'}
        />
      )}

      {isResultNotification(notification) && (
        <S.SmallButton
          onPress={() => fetchMatch(notification.match as Match)}
          height="30px"
          label={'Look'}
        />
      )}
    </Card>
  );
};

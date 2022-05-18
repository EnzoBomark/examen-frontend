import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

const Card = styled.View`
  height: 56px;
  width: 100%;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
  padding: 10px 12px;
  flex-direction: row;
  align-items: center;
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
        <S.Label color="g1000">
          {notification.sender?.name} started following you
        </S.Label>
      )}

      {isInviteNotification(notification) && (
        <S.Label color="g1000">
          {notification.sender?.name} invited you to a game
        </S.Label>
      )}

      {isResultNotification(notification) && (
        <S.Label color="g1000">New match result!</S.Label>
      )}
    </Card>
  );
};

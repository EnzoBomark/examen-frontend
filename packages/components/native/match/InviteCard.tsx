import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { useMatch, useMatchFunctions } from '@racket-traits/api/match';
import { useSendInviteNotification } from '@racket-traits/api/notifications/creators/sendInviteNotification';

const Card = styled.View`
  height: 56px;
  width: 100%;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
  padding: 10px 12px;
  flex-direction: row;
  align-items: center;
`;

const Skill = styled(S.Detail)`
  margin-top: 2px;
  margin-right: auto;
  max-width: 70%;
`;

export const InviteCard: React.FC<User> = (user) => {
  const sendInvitation = useSendInviteNotification();
  const match = useMatch();
  const { isInvited } = useMatchFunctions();

  return (
    <Card style={{ ...theme.shadow }}>
      <S.ProfilePicture user={user} width="36px" border="xxs" />

      <S.Spacer size="xs" />

      <S.Col>
        <S.Label color="g1000">{user.name}</S.Label>

        <Skill color="g400" numberOfLines={1}>
          Rank {user.skill || '-'}
        </Skill>
      </S.Col>

      <S.SmallButton
        onPress={() => sendInvitation(user, match.data)}
        height="30px"
        label={isInvited(match.data, user) ? 'Invited' : 'Invite'}
        background="g100"
        color="g400"
        icon={isInvited(match.data, user) ? 'circleCheck' : 'circleAdd'}
      />
    </Card>
  );
};

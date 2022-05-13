import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { useUserFunctions, useFollowUser } from '@racket-traits/api/user';

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

export const UserCard: React.FC<User> = (user) => {
  const followUser = useFollowUser();
  const { isFriends } = useUserFunctions();

  return (
    <Card style={{ ...theme.shadow }}>
      <S.ProfilePicture user={user} width="36px" border="xxs" />

      <S.Spacer size="xs" />

      <S.Col>
        <S.Label color="g1000">{user.name}</S.Label>

        <Skill color="g400" numberOfLines={1}>
          Rank {user.skill}
        </Skill>
      </S.Col>

      <S.SmallButton
        onPress={() => followUser(user)}
        height="30px"
        label={isFriends(user) ? 'Following' : 'Follow'}
        background="g100"
        color="g400"
        icon={isFriends(user) ? 'circleCheck' : 'circleAdd'}
      />
    </Card>
  );
};

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

const Skill = styled(S.Detail)`
  margin-top: 2px;
  margin-right: auto;
  max-width: 70%;
`;

type Props = {
  user: User;
  isAdded: boolean;
  addUser: React.Dispatch<React.SetStateAction<User[]>>;
};

export const ChatUserCard: React.FC<Props> = ({ user, addUser, isAdded }) => {
  return (
    <Card style={{ ...theme.shadow }}>
      <S.Image src={user.picture || ''} width="36px" border="xxs" />

      <S.Spacer size="xs" />

      <S.Col>
        <S.Label color="g1000">{user.name}</S.Label>

        <Skill color="g400" numberOfLines={1}>
          Rank {user.skill}
        </Skill>
      </S.Col>

      <S.SmallButton
        onPress={() =>
          isAdded
            ? addUser((prev) => prev.filter((u) => u.id !== user.id))
            : addUser((prev) => [...prev, user])
        }
        height="30px"
        label={isAdded ? 'Added' : 'Add'}
        background="g100"
        color="g400"
        icon={isAdded ? 'circleCheck' : 'circleAdd'}
      />
    </Card>
  );
};

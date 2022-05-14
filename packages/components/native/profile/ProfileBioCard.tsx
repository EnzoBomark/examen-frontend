import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Spacer } from '@racket-styles/native';
import { useProfile } from '@racket-traits/api/profile';

const Card = styled.View`
  width: 100%;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
  padding: 16px;
`;

export const ProfileBioCard: React.FC<User> = (user) => {
  const profile = useProfile();
  const noBio = user.id === profile.data.id ? 'Add bio' : 'No bio';

  return (
    <Card style={{ ...theme.shadow }}>
      <S.Label color="g600">Bio</S.Label>
      <Spacer size="xxxs" />
      <S.Body color="g400">{user.description || noBio}</S.Body>
    </Card>
  );
};

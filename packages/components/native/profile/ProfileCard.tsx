import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

const Card = styled.View`
  width: 100%;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
  padding: 10px 12px;
  flex-direction: row;
  align-items: center;
`;

export const ProfileCard: React.FC<User> = (profile) => {
  return (
    <Card style={{ ...theme.shadow }}>
      <S.Image src={profile.picture || ''} width="36px" border="xxs" />

      <S.Spacer size="xs" />

      <S.Body>{profile.name}</S.Body>
      <S.Body>{profile.skill}</S.Body>
      <S.Body>{profile.isRightHand}</S.Body>
      {/* <S.Body>{profile.birthDate}</S.Body> */}
      {/* <S.Body>{profile.city}</S.Body> */}
    </Card>
  );
};

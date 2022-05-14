import * as React from 'react';
import * as S from '@racket-styles/native';
import { Dimensions } from 'react-native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

const screen = Dimensions.get('screen');

const Card = styled.View`
  width: 100%;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
  padding: 10px 12px;
  flex-direction: row;
`;

export const ProfileCard: React.FC<User> = (user) => {
  return (
    <Card style={{ ...theme.shadow }}>
      <S.ProfilePicture
        user={user}
        width={`${screen.width * 0.38}px`}
        height={`${screen.width * 0.55}px`}
        border="xxs"
      />

      <S.Spacer size="xs" />

      <S.Col>
        <S.Fill />

        <S.H4 bold color="g1000" numberOfLines={1}>
          {user.name}
        </S.H4>

        <S.Spacer size="xxs" />

        <S.Row>
          <S.Svg src="star" color={user.skill ? 'p600' : 'g300'} width="15px" />

          <S.Spacer size="xxxs" />

          <S.Body color="g500">
            {user.skill ? `Rank ${user.skill}` : 'No rank'}
          </S.Body>
        </S.Row>

        <S.Spacer size="xs" />

        <S.Detail color="g400">Hand</S.Detail>
        <S.Body color="g500">
          {user.isRightHand ? 'Backhand' : 'Forehand'}
        </S.Body>

        <S.Spacer size="xxs" />

        <S.Detail color="g400">Date of Birth</S.Detail>
        <S.Body color="g500">
          {user.birthDate
            ? new Date(user.birthDate)
                .toLocaleDateString()
                .split('-')
                .reverse()
                .join(' ')
            : '-'}
        </S.Body>

        <S.Spacer size="xxs" />

        <S.Detail color="g400">Main city</S.Detail>
        <S.Body color="g500">{'todo'}</S.Body>

        <S.Fill />
      </S.Col>
    </Card>
  );
};

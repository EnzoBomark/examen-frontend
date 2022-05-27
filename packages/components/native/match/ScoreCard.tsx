import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

const ScoreText = styled(S.H1)`
  text-align: center;
  font-size: 72px;
`;

const Card = styled.View`
  width: 48%;
  height: 140px;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.g50};
`;

export const ScoreCard: React.FC<Match> = (match) => {
  return (
    <S.Row justify="between">
      <Card style={{ ...theme.shadow }}>
        <S.Center>
          <ScoreText color="g600">{match.teamOneScore}</ScoreText>
        </S.Center>
      </Card>
      <Card style={{ ...theme.shadow }}>
        <S.Center>
          <ScoreText color="g600">{match.teamTwoScore}</ScoreText>
        </S.Center>
      </Card>
    </S.Row>
  );
};

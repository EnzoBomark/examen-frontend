import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { useMatchFunctions } from '@racket-traits/api/match';

const ScoreButton = styled.View`
  width: 100%;
  height: 40px;
  border-radius: ${theme.radius.xxs};
  background-color: ${theme.colors.g100};
  justify-content: center;
  align-items: center;
`;

const ScoreCard = styled.View`
  width: 100%;
  height: 140px;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
`;

const ScoreText = styled(S.H1)`
  text-align: center;
  font-size: 72px;
`;

const ScoreContainer = styled.View`
  width: 48%;
`;

export const ScoreMatchModal: React.FC<Match> = (match) => {
  const [teamOneScore, setTeamOneScore] = React.useState(0);
  const [teamTwoScore, setTeamTwoScore] = React.useState(0);

  return (
    <S.Modal>
      <S.ModalOpenButton>
        <S.Button label={'Mark as played'} icon="cup" />
      </S.ModalOpenButton>

      <S.ModalContents>
        <S.Padding size="xs">
          <S.Spacer size="m" />

          <S.Row justify="between">
            <ScoreContainer>
              <S.Clickable
                onPress={() => setTeamOneScore((prev) => prev + 1)}
                disabled={teamOneScore >= 100}
              >
                <ScoreButton style={{ ...theme.shadow }}>
                  <S.Svg src="upArrow" width="20px" color="g800" />
                </ScoreButton>
              </S.Clickable>

              <S.Spacer size="xxxs" />

              <ScoreCard>
                <S.Center>
                  <ScoreText color="g600">{teamOneScore}</ScoreText>
                </S.Center>
              </ScoreCard>

              <S.Spacer size="xxxs" />

              <S.Clickable
                onPress={() => setTeamOneScore((prev) => prev - 1)}
                disabled={teamOneScore <= 0}
              >
                <ScoreButton style={{ ...theme.shadow }}>
                  <S.Svg src="downArrow" width="20px" color="g800" />
                </ScoreButton>
              </S.Clickable>
            </ScoreContainer>
            <ScoreContainer>
              <S.Clickable
                onPress={() => setTeamTwoScore((prev) => prev + 1)}
                disabled={teamTwoScore >= 100}
              >
                <ScoreButton style={{ ...theme.shadow }}>
                  <S.Svg src="upArrow" width="20px" color="g800" />
                </ScoreButton>
              </S.Clickable>

              <S.Spacer size="xxxs" />

              <ScoreCard>
                <S.Center>
                  <ScoreText color="g600">{teamTwoScore}</ScoreText>
                </S.Center>
              </ScoreCard>

              <S.Spacer size="xxxs" />

              <S.Clickable
                onPress={() => setTeamTwoScore((prev) => prev - 1)}
                disabled={teamTwoScore <= 0}
              >
                <ScoreButton style={{ ...theme.shadow }}>
                  <S.Svg src="downArrow" width="20px" color="g800" />
                </ScoreButton>
              </S.Clickable>
            </ScoreContainer>
          </S.Row>

          <S.Spacer size="xxl" />

          <S.Button label="Post score" />
        </S.Padding>
      </S.ModalContents>
    </S.Modal>
  );
};

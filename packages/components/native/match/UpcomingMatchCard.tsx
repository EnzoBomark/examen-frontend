import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

type Props = {
  center: string;
  dateTime: string;
};

const Card = styled.View`
  height: 105px;
  width: 185px;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
`;

export const UpcomingMatchCard: React.FC<Props> = (props) => {
  return (
    <S.Clickable>
      <Card style={{ ...theme.shadow }}>
        <S.Padding size="xs">
          <S.Body bold={true} color="p600">
            {props.center}
          </S.Body>

          <S.Tiny> {props.dateTime}</S.Tiny>
        </S.Padding>
      </Card>
    </S.Clickable>
  );
};

import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

const Card = styled.View`
  width: 48%;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
  padding: 52px 18px;
  align-items: center;
  margin-bottom: 15px;
`;

const Header = styled(S.H1)`
  font-size: 58px;
`;

const Detail = styled(S.H4)`
  text-align: center;
`;

type Props = {
  header: string;
  detail: string;
};

export const ProfileStatsCard: React.FC<Props> = (props) => {
  return (
    <Card style={{ ...theme.shadow }}>
      <Header color="g600">{props.header}</Header>
      <Detail color="g400">{props.detail}</Detail>
    </Card>
  );
};

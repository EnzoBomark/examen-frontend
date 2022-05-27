import theme from '@racket-styles/core/theme';
import * as React from 'react';
import styled from 'styled-components/native';
import { Spacer } from '../layout/Spacer';
import { UnderLine } from '../layout/UnderLine';

const Container = styled.View`
  margin: -16px 0;
  align-self: flex-end;
  width: 97%;
  border-left-width: 1px;
  padding-left: 20px;
  border-color: ${theme.colors.g100};
`;

export const StaticSubList: React.FC<StaticList> = (props) => {
  return (
    <Container>
      {props.items.map((i, index) => (
        <React.Fragment key={index}>
          <Spacer size="xs" />
          {i}
          <Spacer size="xs" />
          {index !== props.items.length - 1 && <UnderLine />}
        </React.Fragment>
      ))}
    </Container>
  );
};

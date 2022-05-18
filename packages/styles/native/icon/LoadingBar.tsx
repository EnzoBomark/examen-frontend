import * as React from 'react';
import ProgressBar from 'react-native-animated-progress';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

const Container = styled.View`
  margin-top: -1px;
`;

export const LoadingBar: React.FC = () => (
  <Container>
    <ProgressBar
      height={1}
      indeterminate
      backgroundColor={theme.colors.p500}
      trackColor="transparent"
    />
  </Container>
);

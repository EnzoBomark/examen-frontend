import * as React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '@racket-styles/core/theme';

const Container = styled(LinearGradient)<Gradient>`
  flex: 1;
  height: ${(props) => props.height || '100%'};
  width: ${(props) => props.width || '100%'};
`;

export const Gradient: React.FC<Gradient> = ({
  children,
  colors,
  start,
  end,
  angle,
  height,
  width,
}) => {
  return (
    <Container
      start={start || { x: 0, y: 0 }}
      end={end || { x: 1, y: 0 }}
      colors={colors || [theme.colors.p300, theme.colors.p600]}
      useAngle={true}
      angle={angle || 0}
      height={height}
      width={width}
    >
      {children}
    </Container>
  );
};

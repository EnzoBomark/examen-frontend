import * as React from 'react';
import styled from 'styled-components/native';

const Container = styled.Pressable<{ opacity: boolean }>`
  opacity: ${({ opacity }) => (opacity ? 0.3 : 1)};
`;

const Inner = styled.View<Clickable>`
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;

export const Clickable: React.FC<Clickable & NativeButton> = (props) => {
  const [pressed, setPressed] = React.useState(false);

  return (
    <Container
      {...props}
      opacity={pressed}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      needsOffscreenAlphaCompositing
    >
      <Inner {...props}>{props.children}</Inner>
    </Container>
  );
};

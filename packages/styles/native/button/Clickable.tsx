import * as React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity``;

const Inner = styled.View<Clickable>`
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;

export const Clickable: React.FC<Clickable & NativeButton> = (props) => {
  return (
    <Container {...props}>
      <Inner {...props}>{props.children}</Inner>
    </Container>
  );
};

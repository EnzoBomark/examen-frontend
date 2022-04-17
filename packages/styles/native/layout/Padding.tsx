import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

export const Padding = styled.View<Padding>`
  flex: ${({ flex }) => (flex ? 1 : 'none')};
  padding-top: ${({ size, vertical }) =>
    vertical !== undefined
      ? vertical
        ? theme.space[size]
        : 0
      : theme.space[size]};
  padding-bottom: ${({ size, vertical }) =>
    vertical !== undefined
      ? vertical
        ? theme.space[size]
        : 0
      : theme.space[size]};
  padding-left: ${({ size, horizontal }) =>
    horizontal !== undefined
      ? horizontal
        ? theme.space[size]
        : 0
      : theme.space[size]};
  padding-right: ${({ size, horizontal }) =>
    horizontal !== undefined
      ? horizontal
        ? theme.space[size]
        : 0
      : theme.space[size]};
`;

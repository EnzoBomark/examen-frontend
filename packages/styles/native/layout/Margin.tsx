import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

export const Margin = styled.View<Margin>`
  margin-top: ${({ size, vertical }) =>
    vertical !== undefined
      ? vertical
        ? theme.space[size]
        : 0
      : theme.space[size]};
  margin-bottom: ${({ size, vertical }) =>
    vertical !== undefined
      ? vertical
        ? theme.space[size]
        : 0
      : theme.space[size]};
  margin-left: ${({ size, horizontal }) =>
    horizontal !== undefined
      ? horizontal
        ? theme.space[size]
        : 0
      : theme.space[size]};
  margin-right: ${({ size, horizontal }) =>
    horizontal !== undefined
      ? horizontal
        ? theme.space[size]
        : 0
      : theme.space[size]};
`;

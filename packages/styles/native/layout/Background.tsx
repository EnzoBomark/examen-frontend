import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

export const Background = styled.View<Background>`
  flex: 1;
  background-color: ${({ color }) => theme.colors[color] || 'transparent'};
`;

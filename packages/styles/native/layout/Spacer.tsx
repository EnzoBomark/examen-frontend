import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

export const Spacer = styled.View<Spacer>`
  height: ${({ size }) => theme.space[size]};
  width: ${({ size }) => theme.space[size]};
`;

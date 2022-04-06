import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

export const Padding = styled.View<SpacerType>`
  padding: ${({ size }) => theme.space[size]};
`;

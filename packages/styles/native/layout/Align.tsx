import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

export const Align = styled.View<Align>`
  align-items: ${({ type }) => theme.align[type]};
`;

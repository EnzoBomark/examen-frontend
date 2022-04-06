import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

export const Align = styled.View<AlignType>`
  align-items: ${({ type }) => theme.align[type]};
`;

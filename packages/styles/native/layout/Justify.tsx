import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

export const Justify = styled.View<JustifyType>`
  justify-items: ${({ type }) => theme.justify[type]};
`;

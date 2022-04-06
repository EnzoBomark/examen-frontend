import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

export const Tiny = styled.Text<TextType>`
  font-size: ${theme.font.xxs};
  color: ${({ color }) => (color ? theme.colors[color] : theme.colors.g1000)};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
`;

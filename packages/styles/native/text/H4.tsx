import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

export const H4 = styled.Text<TextType>`
  font-size: ${theme.font.l};
  color: ${({ color }) => (color ? theme.colors[color] : theme.colors.g1000)};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
`;

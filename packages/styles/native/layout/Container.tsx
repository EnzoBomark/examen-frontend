import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

export const Container = styled.View<Spacer>`
  margin-bottom: ${({ size }) => theme.space[size]};
`;

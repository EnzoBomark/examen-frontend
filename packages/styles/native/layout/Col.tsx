import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';

export const Col = styled.View<Col>`
  flex: 1;
  justify-items: ${({ justify }) =>
    justify ? theme.justify[justify] : 'flex-start'};
  align-items: ${({ align }) => (align ? theme.align[align] : 'flex-start')};
  flex-direction: ${({ reversed }) => (reversed ? 'column-reverse' : 'column')};
`;

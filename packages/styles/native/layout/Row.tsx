import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const screen = Dimensions.get('screen');

export const Row = styled.View<Row>`
  max-width: ${screen.width - 32}px;
  justify-content: ${({ justify }) =>
    justify ? theme.justify[justify] : 'flex-start'};
  align-items: ${({ align }) => (align ? theme.align[align] : 'flex-start')};
  flex-direction: ${({ reversed }) => (reversed ? 'row-reverse' : 'row')};
`;

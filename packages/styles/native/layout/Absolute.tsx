import styled from 'styled-components/native';

type Absolute = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export const Absolute = styled.View<Absolute>`
  position: absolute;
  top: ${({ top }) => top || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
`;

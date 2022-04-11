import * as React from 'react';
import { TextInput } from 'react-native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Body } from '../text/Body';
import { Row } from '../layout/Row';
import { Label } from '../text/Label';
import { Clickable } from '../button/Clickable';

const screen = Dimensions.get('screen');

const Wrapper = styled.View`
  padding-left: 8px;
`;

const Container = styled.View<ListInput>`
  position: relative;
  width: ${({ width }) => width || '100%'};
  max-width: ${screen.width - 32}px;
  border-radius: ${theme.radius.xxs};
  flex-direction: row;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;

const Inner = styled.TextInput<ListInput>`
  padding: 0 8px;
  color: ${({ active }) => (active ? theme.colors.g700 : theme.colors.g600)};
  width: 100%;
  height: 100%;
`;

const InputLabel = styled(Label)``;

const ErrorLabel = styled(Body)`
  padding-top: 8px;
`;

export const ListInput: React.FC<ListInput & NativeTextInput> = (props) => {
  const inner = React.useRef<any>(null);
  const [active, setActive] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const error = showError ? props.error : undefined;

  return (
    <Wrapper>
      <Row align="center">
        <Clickable onPress={() => inner.current.focus()}>
          <Row align="center">
            <InputLabel color="g600">{props.label}</InputLabel>
            <InputLabel color="g400">:</InputLabel>
          </Row>
        </Clickable>

        <Container {...props} error={error} active={active}>
          <Inner
            ref={inner}
            selectionColor={theme.colors.g700}
            keyboardType={props.type || 'default'}
            active={active}
            onFocus={() => {
              setActive(true);
              setShowError(true);
            }}
            onBlur={() => setActive(false)}
            placeholder={active ? undefined : props.placeholder}
            value={props.value}
            onChangeText={props.onTextChange}
          />
        </Container>
      </Row>
      {!!error && (
        <ErrorLabel color={active ? 'g400' : 'error'}>{error}</ErrorLabel>
      )}
    </Wrapper>
  );
};

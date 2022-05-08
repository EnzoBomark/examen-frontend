import * as React from 'react';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Body } from '../text/Body';

const screen = Dimensions.get('screen');

const Wrapper = styled.View`
  flex-shrink: 1;
`;

const Container = styled.View<TextInput>`
  padding-top: 8px;
  position: relative;
  min-height: ${({ height }) => height || '44px'};
  width: ${({ width }) => width || '100%'};
  max-width: ${screen.width - 32}px;
  border-radius: ${theme.radius.xxs};
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${({ error }) =>
    error ? theme.colors.error : theme.colors.g200};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;

const Inner = styled.TextInput<TextInput>`
  padding-right: 16px;
  padding-left: 16px;
  color: ${({ active }) => (active ? theme.colors.g700 : theme.colors.g600)};
  width: 100%;
  height: 100%;
`;

const InputLabel = styled(Body)`
  padding: 0 0 8px 8px;
`;

const ErrorLabel = styled(Body)`
  padding: 0 0 3px 8px;
`;

export const TextArea: React.FC<TextArea & NativeTextInput> = (props) => {
  const [active, setActive] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const error = showError ? props.error : undefined;

  return (
    <Wrapper>
      {props.label && active && (
        <InputLabel color="g600">{props.placeholder}</InputLabel>
      )}
      {!!error && (
        <ErrorLabel color={active ? 'g400' : 'error'}>{error}</ErrorLabel>
      )}
      <Container {...props} error={error} active={active}>
        <Inner
          multiline
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
    </Wrapper>
  );
};

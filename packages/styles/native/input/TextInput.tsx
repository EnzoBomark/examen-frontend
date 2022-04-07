import * as React from 'react';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Body } from '../text/Body';
import { Svg } from '../icon/Svg';

const screen = Dimensions.get('screen');

const Container = styled.View<TextInput>`
  position: relative;
  height: ${({ height }) => height || '44px'};
  width: ${({ width }) => width || '100%'};
  max-width: ${screen.width - 32}px;
  border-radius: ${theme.radius.xxs};
  flex-direction: row;
  align-items: center;
  border-width: ${({ error, active }) => (error || active ? '1px' : 0)};
  border-color: ${({ active }) =>
    active ? theme.colors.g200 : theme.colors.error};
  background-color: ${({ active }) =>
    active ? theme.colors.g100 : theme.colors.g100};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;

const Inner = styled.TextInput<TextInput>`
  padding-right: 16px;
  padding-left: ${({ icon }) => (icon ? '48px' : '16px')};
  color: ${({ active }) => (active ? theme.colors.g700 : theme.colors.g600)};
  width: 100%;
  height: 100%;
`;

const InputLabel = styled(Body)`
  padding: 0 0 8px 8px;
`;

const ErrorLabel = styled(Body)`
  padding: 8px 0 0 8px;
`;

const Icon = styled.View`
  position: absolute;
  left: 16px;
`;

export const TextInput: React.FC<TextInput & NativeTextInput> = (props) => {
  const [active, setActive] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const error = showError ? props.error : undefined;

  return (
    <React.Fragment>
      {props.label && active && (
        <InputLabel color="g600">{props.placeholder}</InputLabel>
      )}
      <Container {...props} error={error} active={active}>
        {props.icon && (
          <Icon>
            <Svg
              src={props.icon}
              color={active ? 'g500' : 'g400'}
              width="18px"
            />
          </Icon>
        )}
        <Inner
          selectionColor={theme.colors.g700}
          keyboardType={props.type || 'default'}
          secureTextEntry={props.password}
          active={active}
          onFocus={() => {
            setActive(true);
            setShowError(true);
          }}
          onBlur={() => setActive(false)}
          icon={props.icon}
          placeholder={active ? undefined : props.placeholder}
          value={props.value}
          onChangeText={props.onTextChange}
        />
      </Container>
      {!!error && (
        <ErrorLabel color={active ? 'g400' : 'error'}>{error}</ErrorLabel>
      )}
    </React.Fragment>
  );
};

import * as React from 'react';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Body } from '../text/Body';
import { Svg } from '../icon/Svg';

type TextInput = NativeInputFunctions & InputAddons & InputType & InputSizing;

const screen = Dimensions.get('screen');

const Container = styled.View<TextInput>`
  position: relative;
  height: ${({ height }) => height || '44px'};
  width: ${({ width }) => width || '100%'};
  max-width: ${screen.width - 32}px;
  border-radius: ${theme.radius.xxs};
  flex-direction: row;
  align-items: center;
  border-width: ${({ error }) => (error ? '1px' : 0)};
  border-color: ${theme.colors.error};
  background-color: ${({ active }) =>
    active ? theme.colors.p200 : theme.colors.g100};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;

const Inner = styled.TextInput<TextInput>`
  padding-right: 16px;
  padding-left: ${({ icon }) => (icon ? '48px' : '16px')};
  color: ${({ active }) => (active ? theme.colors.p600 : theme.colors.g600)};
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

export const TextInput: React.FC<TextInput> = (props) => {
  const [active, setActive] = React.useState(false);
  const [error, setError] = React.useState(props.error);

  React.useEffect(() => {
    if (active) setError('');
  }, [active]);

  return (
    <React.Fragment>
      {props.label && <InputLabel color="g400">{props.label}</InputLabel>}
      <Container {...props} error={error} active={active}>
        {props.icon && (
          <Icon>
            <Svg
              src={props.icon}
              color={active ? 'p600' : 'g400'}
              width="18px"
            />
          </Icon>
        )}
        <Inner
          active={active}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          icon={props.icon}
          placeholderTextColor={active ? theme.colors.p400 : theme.colors.g400}
          placeholder={props.placeholder}
        />
      </Container>
      {!!error && <ErrorLabel color="error">{error}</ErrorLabel>}
    </React.Fragment>
  );
};

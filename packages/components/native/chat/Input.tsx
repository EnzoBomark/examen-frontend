import * as React from 'react';
import * as Native from 'react-native';
import * as S from '@racket-styles/native';
import styled from 'styled-components/native';
import theme from '@racket-styles/core/theme';
import validate, { v } from '@racket-traits/validation';
import { useSendMessage } from '@racket-traits/api/chat';
import { useTranslation } from '@racket-traits/lang';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screen = Native.Dimensions.get('screen');

const Container = styled.View<{ insets: number }>`
  padding: 8px 16px;
  padding-bottom: ${({ insets }) => 8 + insets}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Send = styled.View<{ isValid: boolean }>`
  background-color: ${({ isValid }) =>
    isValid ? theme.colors.p600 : theme.colors.g200};
  border-radius: 60px;
  height: 35px;
  width: 35px;
  justify-content: center;
  align-items: center;
`;

export const Input: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { chat: t } = useTranslation();
  const sendMessage = useSendMessage();
  const [message, setMessage] = React.useState('');

  const criteria = new Map([[{ message }, [v.max(600)]]]);

  return (
    <Container insets={insets.bottom}>
      <S.Clickable onPress={() => setMessage('')}>
        <S.Svg src="trash" width="20px" color="g300" />
      </S.Clickable>
      <S.Spacer size="xs" />
      <S.TextArea
        placeholder={t.send_message}
        value={message}
        onTextChange={setMessage}
        error={validate(criteria, { message }, true)}
      />
      <S.Spacer size="xs" />
      <S.Clickable
        disabled={!!validate(criteria, { message })}
        onPress={() => {
          sendMessage(message);
          setMessage('');
        }}
      >
        <Send isValid={!validate(criteria, { message })}>
          <S.Svg
            src="upArrow"
            width="15px"
            color={!validate(criteria, { message }) ? 'g0' : 'g500'}
          />
        </Send>
      </S.Clickable>
    </Container>
  );
};

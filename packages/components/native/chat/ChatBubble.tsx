import * as React from 'react';
import * as Native from 'react-native';
import * as S from '@racket-styles/native';
import { getTime, getDate } from '@racket-traits/utils';
import styled from 'styled-components/native';
import theme from '@racket-styles/core/theme';

const screen = Native.Dimensions.get('screen');

const Container = styled.View<Partial<FormattedMessage>>`
  padding: 12px;
  max-width: ${screen.width - 60}px;
  border-top-right-radius: ${theme.radius.xs};
  border-top-left-radius: ${theme.radius.xs};
  border-bottom-left-radius: ${({ isMe }) => (isMe ? theme.radius.xs : '3px')};
  border-bottom-right-radius: ${({ isMe }) => (isMe ? '3px' : theme.radius.xs)};
  background-color: ${({ isMe }) =>
    isMe ? theme.colors.p200 : theme.colors.p600};
  margin-left: ${({ isMe, user }) => (!isMe ? (user ? '8px' : '32px') : 0)};
`;

const Date = styled(S.Detail)`
  color: ${theme.colors.g400};
  margin: 8px 0;
  align-self: center;
`;

const Name = styled(S.Tiny)`
  color: ${theme.colors.p400};
  margin-bottom: 3px;
`;

const Time = styled(S.Tiny)<Partial<FormattedMessage>>`
  flex-grow: 1;
  color: ${({ isMe }) => (isMe ? theme.colors.p600 : theme.colors.p400)};
  margin-left: 6px;
  margin-top: auto;
`;

const Message = styled(S.Body)<Partial<FormattedMessage>>`
  flex-shrink: 1;
  color: ${({ isMe }) => (isMe ? theme.colors.g1000 : theme.colors.g0)};
`;

const Wrapper = styled(S.Row)<Partial<FormattedMessage>>`
  max-width: 100%;
  align-self: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
  margin-top: ${({ isPrevSameId }) => (isPrevSameId ? 0 : '10px')};
`;

type Props = FormattedMessage;

export const ChatBubble: React.FC<Props> = (props) => {
  return (
    <>
      <Wrapper {...props} align="end">
        {!props.isMe && props.user && (
          <S.ProfilePicture user={props.user} width="25px" />
        )}

        <Container {...props}>
          {!props.isMe && props.name && <Name>{props.name}</Name>}
          <S.Row>
            <Message {...props}>{props.message}</Message>
            <Time {...props}>{getTime(props.time)}</Time>
          </S.Row>
        </Container>
      </Wrapper>
      {props.date && <Date>{getDate(props.date)}</Date>}
    </>
  );
};

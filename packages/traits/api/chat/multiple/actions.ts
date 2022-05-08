import { Action, Types } from './types';

export const unload = (): Action => ({
  type: Types.UNLOAD,
});

export const pending = (): Action => ({
  type: Types.PENDING,
});

export const success = (chats: Chat[]): Action => ({
  type: Types.SUCCESS,
  payload: chats,
});

export const refresh = (chats: Chat[]): Action => ({
  type: Types.REFRESH,
  payload: chats,
});

export const fail = (error: ResponseError): Action => ({
  type: Types.FAIL,
  payload: error,
});

export const pushMessages = (messages: Message[], chat: Chat): Action => ({
  type: Types.PUSH_MESSAGES,
  payload: { messages, chat },
});

export const pushChat = (chat: Chat): Action => ({
  type: Types.PUSH_CHAT,
  payload: chat,
});

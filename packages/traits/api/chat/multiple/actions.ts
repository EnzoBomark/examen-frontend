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

export const createChat = (chat: Chat): Action => ({
  type: Types.CREATE_CHAT,
  payload: chat,
});

export const setChats = (chat: Chat): Action => ({
  type: Types.SET_CHATS,
  payload: chat,
});

export const updateReadStatus = (
  readStatus: ReadStatus[],
  chat: Chat
): Action => ({
  type: Types.UPDATE_READ_STATUS,
  payload: { readStatus, chat },
});

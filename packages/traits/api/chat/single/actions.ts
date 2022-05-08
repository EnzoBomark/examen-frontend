import { Action, Types } from './types';

export const unload = (): Action => ({
  type: Types.UNLOAD,
});

export const pending = (): Action => ({
  type: Types.PENDING,
});

export const success = (chat: Chat): Action => ({
  type: Types.SUCCESS,
  payload: chat,
});

export const fail = (error: ResponseError<Chat>): Action => ({
  type: Types.FAIL,
  payload: error,
});

export const setChat = (chat: Chat): Action => ({
  type: Types.SET_CHAT,
  payload: chat,
});

export const initMessages = (messages: Message[], chat: Chat): Action => ({
  type: Types.INIT_MESSAGES,
  payload: { messages, verification: chat.id },
});

export const addMessages = (messages: Message[], chat: Chat): Action => ({
  type: Types.ADD_MESSAGE,
  payload: { messages, verification: chat.id },
});

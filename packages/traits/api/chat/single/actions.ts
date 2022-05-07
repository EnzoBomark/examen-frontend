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

export const initMessages = (messages: Message[]): Action => ({
  type: Types.INIT_MESSAGES,
  payload: messages,
});

export const updateReadStatuses = (readStatuses: ReadStatus[]): Action => ({
  type: Types.UPDATE_READ_STATUSES,
  payload: readStatuses,
});

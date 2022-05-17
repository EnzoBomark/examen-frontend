import { ActionMap } from '@racket-common/store';

export type State = {
  isLoading: boolean;
  hasLoaded: boolean;
  hasMore: boolean;
  hasError?: ResponseError;
  page: number;
  data: Chat[];
};

export enum Types {
  UNLOAD = 'UNLOAD',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  REFRESH = 'REFRESH',
  FAIL = 'FAIL',
  CREATE_CHAT = 'CREATE_CHAT',
  SET_CHATS = 'SET_CHATS',
  PUSH_MESSAGES = 'PUSH_MESSAGES',
  UPDATE_READ_STATUS = 'PUSH_READ_STATUS',
}

export type Payload = {
  [Types.UNLOAD]: undefined;
  [Types.PENDING]: undefined;
  [Types.SUCCESS]: Chat[];
  [Types.REFRESH]: Chat[];
  [Types.FAIL]: ResponseError;
  [Types.CREATE_CHAT]: Chat;
  [Types.SET_CHATS]: Chat;
  [Types.UPDATE_READ_STATUS]: {
    readStatus: ReadStatus[];
    chat: Chat;
  };
  [Types.PUSH_MESSAGES]: {
    messages: Message[];
    chat: Chat;
  };
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

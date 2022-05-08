import { ActionMap } from '@racket-common/store';

export type State = {
  isLoading: boolean;
  hasLoaded: boolean;
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
  PUSH_CHAT = 'PUSH_CHAT',
  PUSH_MESSAGES = 'PUSH_MESSAGES',
}

export type Payload = {
  [Types.UNLOAD]: undefined;
  [Types.PENDING]: undefined;
  [Types.SUCCESS]: Chat[];
  [Types.REFRESH]: Chat[];
  [Types.FAIL]: ResponseError;
  [Types.PUSH_CHAT]: Chat;
  [Types.PUSH_MESSAGES]: {
    messages: Message[];
    chat: Chat;
  };
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

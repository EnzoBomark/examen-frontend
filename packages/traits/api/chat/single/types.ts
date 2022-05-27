import { ActionMap } from '@racket-common/store';

export type State = {
  isLoading: boolean;
  hasLoaded: boolean;
  hasError?: ResponseError<Chat>;
  data: Chat;
};

export enum Types {
  UNLOAD = 'UNLOAD',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  SET_CHAT = 'SET_CHAT',
  INIT_MESSAGES = 'INIT_MESSAGES',
  ADD_MESSAGE = 'ADD_MESSAGE',
  MARK_AS_READ = 'MARK_AS_READ',
}

export type Payload = {
  [Types.UNLOAD]: undefined;
  [Types.PENDING]: undefined;
  [Types.SUCCESS]: Chat;
  [Types.FAIL]: ResponseError<Chat>;
  [Types.SET_CHAT]: Chat;
  [Types.INIT_MESSAGES]: { messages: Message[]; verification: string };
  [Types.ADD_MESSAGE]: { messages: Message[]; verification: string };
  [Types.MARK_AS_READ]: ReadStatus;
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

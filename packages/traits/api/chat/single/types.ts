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
  UPDATE_READ_STATUSES = 'UPDATE_READ_STATUSES',
  MARK_AS_READ = 'MARK_AS_READ',
}

export type Payload = {
  [Types.UNLOAD]: undefined;
  [Types.PENDING]: undefined;
  [Types.SUCCESS]: Chat;
  [Types.FAIL]: ResponseError<Chat>;
  [Types.SET_CHAT]: Chat;
  [Types.INIT_MESSAGES]: Message[];
  [Types.UPDATE_READ_STATUSES]: ReadStatus[];
  [Types.MARK_AS_READ]: ReadStatus;
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

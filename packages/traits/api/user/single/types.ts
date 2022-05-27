import { ActionMap } from '@racket-common/store';

export type State = {
  isLoading: boolean;
  hasLoaded: boolean;
  hasError?: ResponseError<User>;
  data: User;
};

export enum Types {
  UNLOAD = 'UNLOAD',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  SET_USER = 'SET_USER',
}

export type Payload = {
  [Types.UNLOAD]: undefined;
  [Types.PENDING]: undefined;
  [Types.SUCCESS]: User;
  [Types.FAIL]: ResponseError<User>;
  [Types.SET_USER]: User;
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

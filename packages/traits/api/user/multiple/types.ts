import { ActionMap } from '@racket-common/store';

export type State = {
  isLoading: boolean;
  hasLoaded: boolean;
  hasMore: boolean;
  hasError?: ResponseError;
  page: number;
  data: User[];
};

export enum Types {
  UNLOAD = 'UNLOAD',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  REFRESH = 'REFRESH',
  FAIL = 'FAIL',
  RESIGN_FOLLOW = 'RESIGN_FOLLOW',
}

export type Payload = {
  [Types.UNLOAD]: undefined;
  [Types.PENDING]: undefined;
  [Types.SUCCESS]: User[];
  [Types.REFRESH]: User[];
  [Types.FAIL]: ResponseError;
  [Types.RESIGN_FOLLOW]: { user: User; profile: User };
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

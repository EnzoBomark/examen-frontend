import { ActionMap } from '@racket-common/store';

export type State = {
  isLoading: boolean;
  hasLoaded: boolean;
  hasError?: ResponseError<Center>;
  data: Center;
};

export enum Types {
  UNLOAD = 'UNLOAD',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  SET_CENTER = 'SET_CENTER',
}

export type Payload = {
  [Types.UNLOAD]: undefined;
  [Types.PENDING]: undefined;
  [Types.SUCCESS]: Center;
  [Types.FAIL]: ResponseError<Center>;
  [Types.SET_CENTER]: Center;
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

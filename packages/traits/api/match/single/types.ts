import { ActionMap } from '@racket-common/store';

export type State = {
  isLoading: boolean;
  hasLoaded: boolean;
  hasError?: ResponseError<Match>;
  data: Match;
};

export enum Types {
  UNLOAD = 'UNLOAD',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  SET_MATCH = 'SET_MATCH',
}

export type Payload = {
  [Types.UNLOAD]: undefined;
  [Types.PENDING]: undefined;
  [Types.SUCCESS]: Match;
  [Types.FAIL]: ResponseError<Match>;
  [Types.SET_MATCH]: Match;
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

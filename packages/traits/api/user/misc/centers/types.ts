import { ActionMap } from '@racket-common/store';

export type State = {
  isLoading: boolean;
  hasLoaded: boolean;
  hasError?: ResponseError;
  page: number;
  data: Center[];
  count: number;
};

export enum Types {
  UNLOAD = 'UNLOAD',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  REFRESH = 'REFRESH',
  FAIL = 'FAIL',
  COUNT = 'COUNT',
}

export type Payload = {
  [Types.UNLOAD]: undefined;
  [Types.PENDING]: undefined;
  [Types.SUCCESS]: Center[];
  [Types.REFRESH]: Center[];
  [Types.FAIL]: ResponseError;
  [Types.COUNT]: number;
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

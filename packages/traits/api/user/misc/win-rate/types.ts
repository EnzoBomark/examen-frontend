import { ActionMap } from '@racket-common/store';

export type State = {
  isLoading: boolean;
  hasLoaded: boolean;
  hasError?: ResponseError;
  data: number;
};

export enum Types {
  UNLOAD = 'UNLOAD',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  REFRESH = 'REFRESH',
  FAIL = 'FAIL',
}

export type Payload = {
  [Types.UNLOAD]: undefined;
  [Types.PENDING]: undefined;
  [Types.SUCCESS]: number;
  [Types.FAIL]: ResponseError;
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

import { ActionMap } from '@racket-common/store';

export type State = {
  isLoading: boolean;
  hasMore: boolean;
  hasLoaded: boolean;
  hasError?: ResponseError;
  page: number;
  data: Match[];
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
  [Types.SUCCESS]: Match[];
  [Types.REFRESH]: Match[];
  [Types.FAIL]: ResponseError;
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

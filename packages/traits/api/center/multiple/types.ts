import { ActionMap } from '@racket-common/store';

export type State = {
  isLoading: boolean;
  hasLoaded: boolean;
  hasMore: boolean;
  hasError?: ResponseError;
  page: number;
  data: Center[];
};

export enum Types {
  UNLOAD = 'UNLOAD',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  REFRESH = 'REFRESH',
  FAIL = 'FAIL',
  RESIGN_BOOKMARK = 'RESIGN_BOOKMARK',
}

export type Payload = {
  [Types.UNLOAD]: undefined;
  [Types.PENDING]: undefined;
  [Types.SUCCESS]: Center[];
  [Types.REFRESH]: Center[];
  [Types.FAIL]: ResponseError;
  [Types.RESIGN_BOOKMARK]: { center: Center; profile: User };
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

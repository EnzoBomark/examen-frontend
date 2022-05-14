import { Action, Types } from './types';

export const unload = (): Action => ({
  type: Types.UNLOAD,
});

export const pending = (): Action => ({
  type: Types.PENDING,
});

export const success = (users: User[]): Action => ({
  type: Types.SUCCESS,
  payload: users,
});

export const refresh = (users: User[]): Action => ({
  type: Types.REFRESH,
  payload: users,
});

export const fail = (error: ResponseError): Action => ({
  type: Types.FAIL,
  payload: error,
});

export const count = (count: number): Action => ({
  type: Types.COUNT,
  payload: count,
});

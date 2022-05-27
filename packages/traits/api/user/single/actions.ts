import { Action, Types } from './types';

export const unload = (): Action => ({
  type: Types.UNLOAD,
});

export const pending = (): Action => ({
  type: Types.PENDING,
});

export const success = (user: User): Action => ({
  type: Types.SUCCESS,
  payload: user,
});

export const fail = (error: ResponseError<User>): Action => ({
  type: Types.FAIL,
  payload: error,
});

export const setUser = (user: User): Action => ({
  type: Types.SET_USER,
  payload: user,
});

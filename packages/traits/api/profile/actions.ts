import { Action, Types } from './types';

export const unload = (): Action => ({
  type: Types.UNLOAD,
});

export const pending = (): Action => ({
  type: Types.PENDING,
});

export const success = (profile: User): Action => ({
  type: Types.SUCCESS,
  payload: profile,
});

export const fail = (error: ResponseError<User>): Action => ({
  type: Types.FAIL,
  payload: error,
});

export const setProfile = (profile: User): Action => ({
  type: Types.SET_PROFILE,
  payload: profile,
});

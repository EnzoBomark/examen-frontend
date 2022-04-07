import { Action, ResponseError, Types, Profile } from './types';

export const unload = (): Action => ({
  type: Types.UNLOAD,
});

export const pending = (): Action => ({
  type: Types.PENDING,
});

export const success = (profile: Profile): Action => ({
  type: Types.SUCCESS,
  payload: profile,
});

export const fail = (error: ResponseError): Action => ({
  type: Types.FAIL,
  payload: error,
});

export const setProfile = (profile: Profile): Action => ({
  type: Types.SET_PROFILE,
  payload: profile,
});

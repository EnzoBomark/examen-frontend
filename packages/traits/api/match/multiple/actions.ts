import { Action, Types } from './types';

export const unload = (): Action => ({
  type: Types.UNLOAD,
});

export const pending = (): Action => ({
  type: Types.PENDING,
});

export const success = (matches: Match[]): Action => ({
  type: Types.SUCCESS,
  payload: matches,
});

export const refresh = (matches: Match[]): Action => ({
  type: Types.REFRESH,
  payload: matches,
});

export const fail = (error: ResponseError): Action => ({
  type: Types.FAIL,
  payload: error,
});

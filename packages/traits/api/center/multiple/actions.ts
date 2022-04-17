import { Action, Types } from './types';

export const unload = (): Action => ({
  type: Types.UNLOAD,
});

export const pending = (): Action => ({
  type: Types.PENDING,
});

export const success = (centers: Center[]): Action => ({
  type: Types.SUCCESS,
  payload: centers,
});

export const refresh = (centers: Center[]): Action => ({
  type: Types.REFRESH,
  payload: centers,
});

export const fail = (error: ResponseError): Action => ({
  type: Types.FAIL,
  payload: error,
});

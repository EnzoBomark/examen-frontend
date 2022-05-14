import { Action, Types } from './types';

export const unload = (): Action => ({
  type: Types.UNLOAD,
});

export const pending = (): Action => ({
  type: Types.PENDING,
});

export const success = (winRate: number): Action => ({
  type: Types.SUCCESS,
  payload: winRate,
});

export const fail = (error: ResponseError): Action => ({
  type: Types.FAIL,
  payload: error,
});

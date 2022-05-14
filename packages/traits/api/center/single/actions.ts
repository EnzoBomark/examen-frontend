import { Action, Types } from './types';

export const unload = (): Action => ({
  type: Types.UNLOAD,
});

export const pending = (): Action => ({
  type: Types.PENDING,
});

export const success = (center: Center): Action => ({
  type: Types.SUCCESS,
  payload: center,
});

export const fail = (error: ResponseError<Center>): Action => ({
  type: Types.FAIL,
  payload: error,
});

export const setCenter = (center: Center): Action => ({
  type: Types.SET_CENTER,
  payload: center,
});

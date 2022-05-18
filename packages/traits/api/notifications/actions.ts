import { Action, Types } from './types';

export const unload = (): Action => ({
  type: Types.UNLOAD,
});

export const pending = (): Action => ({
  type: Types.PENDING,
});

export const success = (notifications: CombinedNotification[]): Action => ({
  type: Types.SUCCESS,
  payload: notifications,
});

export const refresh = (notifications: CombinedNotification[]): Action => ({
  type: Types.REFRESH,
  payload: notifications,
});

export const fail = (error: ResponseError): Action => ({
  type: Types.FAIL,
  payload: error,
});

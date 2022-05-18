import { Action, Types } from './types';

export const unload = (): Action => ({
  type: Types.UNLOAD,
});

export const pending = (): Action => ({
  type: Types.PENDING,
});

export const success = (match: Match): Action => ({
  type: Types.SUCCESS,
  payload: match,
});

export const fail = (error: ResponseError<Match>): Action => ({
  type: Types.FAIL,
  payload: error,
});

export const setMatch = (match: Match): Action => ({
  type: Types.SET_MATCH,
  payload: match,
});

export const setNotification = (notification: InviteNotification): Action => ({
  type: Types.SET_NOTIFICATION,
  payload: notification,
});

export const kickPlayer = (user: User): Action => ({
  type: Types.KICK_PLAYER,
  payload: user,
});

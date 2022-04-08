import { AxiosResponse } from '../index';
import { ActionMap } from '@racket-common/store';

export type Profile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  picture?: string;
  description?: string;
  skill?: '0' | '1' | '2' | '3' | '4' | '5';
  isRightHand?: boolean;
  fcm?: string;
};

export type ErrorFields = {
  [K in keyof Profile]?: string;
};

export type ResponseError = {
  statusCode: number;
  error: string;
  message: string;
  attributes?: ErrorFields;
};

export type State = {
  isLoading: boolean;
  hasLoaded: boolean;
  hasError?: ResponseError;
  data: Profile;
};

export enum Types {
  UNLOAD = 'UNLOAD',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  SET_PROFILE = 'SET_PROFILE',
}

export type Payload = {
  [Types.UNLOAD]: undefined;
  [Types.PENDING]: undefined;
  [Types.SUCCESS]: Profile;
  [Types.FAIL]: ResponseError;
  [Types.SET_PROFILE]: Profile;
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

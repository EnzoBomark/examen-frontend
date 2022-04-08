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

export type State = {
  isLoading: boolean;
  hasLoaded: boolean;
  hasError?: ResponseError<Profile>;
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
  [Types.FAIL]: ResponseError<Profile>;
  [Types.SET_PROFILE]: Profile;
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

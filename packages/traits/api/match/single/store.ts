import { createStore } from '@racket-common/store';
import { resign, unique } from '@racket-traits/utils';
import { Action, State, Types } from './types';

const initialState: State = {
  isLoading: false,
  hasLoaded: false,
  hasError: undefined,
  data: {
    id: '',
    dateTime: '',
    type: 'double',
    duration: '90',
    currency: 'SEK',
    court: undefined,
    price: undefined,
    phone: undefined,
    result: undefined,
    isPublic: undefined,
    isPlayed: undefined,
    isBooked: undefined,
    centerId: undefined,
    createdAt: '',
    updatedAt: '',
  },
};

const store = createStore<State, Action>({
  name: 'match',
  reducer: (state = initialState, action) => {
    switch (action.type) {
      case Types.UNLOAD:
        return initialState;

      case Types.PENDING:
        return {
          ...state,
          isLoading: true,
          hasError: undefined,
        };

      case Types.SUCCESS:
        return {
          ...state,
          hasLoaded: true,
          isLoading: false,
          data: action.payload,
        };

      case Types.FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: action.payload,
        };

      case Types.SET_MATCH:
        return {
          ...state,
          hasLoaded: true,
          isLoading: false,
          data: action.payload,
        };

      case Types.SET_NOTIFICATION:
        return {
          ...state,
          hasLoaded: true,
          isLoading: false,
          data: {
            ...state.data,
            notifications: unique(
              state.data.notifications,
              action.payload,
              'id'
            ),
          },
        };

      case Types.KICK_PLAYER:
        return {
          ...state,
          hasLoaded: true,
          isLoading: false,
          data: {
            ...state.data,
            users: resign(state.data.users || [], action.payload, 'id'),
          },
        };

      default:
        return state;
    }
  },
});

export default store;

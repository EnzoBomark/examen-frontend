import { createStore } from '@racket-common/store';
import { Action, State, Types } from './types';

const initialState: State = {
  isLoading: false,
  hasLoaded: false,
  hasError: undefined,
  data: {
    id: '',
    name: '',
    email: '',
    phone: '',
    picture: undefined,
    description: undefined,
    skill: undefined,
    isRightHand: undefined,
    fcm: undefined,
    usersMatches: undefined,
  },
};

const store = createStore<State, Action>({
  name: 'user',
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

      case Types.SET_USER:
        return {
          ...state,
          data: action.payload,
        };

      default:
        return state;
    }
  },
});

export default store;

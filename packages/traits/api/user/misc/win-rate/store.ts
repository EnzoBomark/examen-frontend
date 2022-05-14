import { createStore } from '@racket-common/store';
import { Action, State, Types } from './types';
import { unique } from '@racket-traits/utils';

const initialState: State = {
  isLoading: false,
  hasLoaded: false,
  hasError: undefined,
  data: 0,
};

const store = createStore<State, Action>({
  name: 'win-rate',
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
          hasLoaded: true,
          hasError: action.payload,
        };

      default:
        return state;
    }
  },
});

export default store;

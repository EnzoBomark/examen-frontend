import { createStore } from '@racket-common/store';
import { Action, State, Types } from './types';
import { unique } from '@racket-traits/utils';

const initialState: State = {
  isLoading: false,
  hasLoaded: false,
  hasError: undefined,
  page: 0,
  data: [],
  count: 0,
};

const store = createStore<State, Action>({
  name: 'followers',
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
          page: action.payload.length ? state.page + 1 : state.page,
          data: unique(state.data, action.payload, 'id'),
        };

      case Types.REFRESH:
        return {
          ...state,
          hasLoaded: true,
          isLoading: false,
          page: 0,
          data: action.payload,
        };

      case Types.FAIL:
        return {
          ...state,
          isLoading: false,
          hasLoaded: true,
          hasError: action.payload,
        };

      case Types.COUNT:
        return {
          ...state,
          count: action.payload,
        };

      default:
        return state;
    }
  },
});

export default store;

import { createStore } from '@racket-common/store';
import { alter, hasMore, resign, unique } from '@racket-traits/utils';
import { Action, State, Types } from './types';

const initialState: State = {
  isLoading: false,
  hasLoaded: false,
  hasMore: false,
  hasError: undefined,
  page: 0,
  data: [],
};

const store = createStore<State, Action>({
  name: 'centers',
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
          hasMore: hasMore(action.payload),
          page: action.payload.length ? state.page + 1 : state.page,
          data: unique(state.data, action.payload, 'id'),
        };

      case Types.REFRESH:
        return {
          ...state,
          hasLoaded: true,
          isLoading: false,
          hasMore: hasMore(action.payload),
          page: 0,
          data: action.payload,
        };

      case Types.FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: action.payload,
        };

      case Types.RESIGN_BOOKMARK:
        return {
          ...state,
          data: alter(state.data, action.payload.center, 'id', (center) => ({
            users: resign(center.users, action.payload.profile, 'id'),
          })),
        };

      default:
        return state;
    }
  },
});

export default store;

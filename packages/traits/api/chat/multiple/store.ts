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
  name: 'chats',
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

      case Types.CREATE_CHAT:
        return {
          ...state,
          data: unique(state.data, action.payload, 'id'),
        };

      case Types.SET_CHATS:
        return {
          ...state,
          data: resign(state.data, action.payload, 'id'),
        };

      case Types.PUSH_MESSAGES:
        return {
          ...state,
          data: alter(state.data, action.payload.chat, 'id', (chat) => ({
            messages: unique(action.payload.messages, chat.messages, 'key'),
          })),
        };

      case Types.UPDATE_READ_STATUS:
        return {
          ...state,
          data: alter(state.data, action.payload.chat, 'id', () => ({
            readStatus: action.payload.readStatus,
          })),
        };

      default:
        return state;
    }
  },
});

export default store;

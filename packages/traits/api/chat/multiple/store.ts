import { createStore } from '@racket-common/store';
import { Action, State, Types } from './types';

const initialState: State = {
  isLoading: false,
  hasLoaded: false,
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
          page: state.page + 1,
          data: [
            ...new Map(
              [...state.data, ...action.payload].map((item) => [item.id, item])
            ).values(),
          ],
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
          hasError: action.payload,
        };

      case Types.PUSH_CHAT:
        return {
          ...state,
          data: [
            ...new Map(
              [action.payload, ...state.data].map((item) => [item.id, item])
            ).values(),
          ],
        };

      case Types.PUSH_MESSAGES:
        return {
          ...state,
          data: state.data.map((chat) =>
            chat.id === action.payload.chat.id
              ? {
                  ...chat,
                  messages: [
                    ...new Map(
                      [...action.payload.messages, ...chat.messages].map(
                        (item) => [item.key, item]
                      )
                    ).values(),
                  ],
                }
              : chat
          ),
        };

      default:
        return state;
    }
  },
});

export default store;

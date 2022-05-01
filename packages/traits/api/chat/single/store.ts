import { createStore } from '@racket-common/store';
import { Action, State, Types } from './types';

const initialState: State = {
  isLoading: false,
  hasLoaded: false,
  hasError: undefined,
  data: {
    id: '',
    type: 'user',
    users: [],
    messages: [],
    readStatus: [],
  },
};

const store = createStore<State, Action>({
  name: 'chat',
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

      case Types.SET_CHAT:
        return {
          ...state,
          data: action.payload,
        };

      case Types.INIT_MESSAGES:
        return {
          ...state,
          data: {
            ...state.data,
            messages: action.payload,
          },
        };

      case Types.ADD_MESSAGE:
        return {
          ...state,
          data: {
            ...state.data,
            messages: [
              ...new Map(
                [...state.data.messages, action.payload].map((item) => [
                  item.key,
                  item,
                ])
              ).values(),
            ],
          },
        };

      default:
        return state;
    }
  },
});

export default store;

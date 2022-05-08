import { pushChat } from '../actions';
import store from '../store';

export const useAddChat = () => {
  const dispatch = store.useDispatch();

  const addChat = (chat: Chat) => {
    dispatch(pushChat(chat));
  };
  return addChat;
};

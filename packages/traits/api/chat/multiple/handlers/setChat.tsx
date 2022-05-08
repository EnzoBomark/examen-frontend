import { setChat } from '../actions';
import store from '../store';

export const useSetChat = () => {
  const dispatch = store.useDispatch();

  return (chat: Chat) => {
    dispatch(setChat(chat));
  };
};

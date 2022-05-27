import { createChat } from '../actions';
import store from '../store';

export const useCreateChat = () => {
  const dispatch = store.useDispatch();

  return (chat: Chat) => {
    dispatch(createChat(chat));
  };
};

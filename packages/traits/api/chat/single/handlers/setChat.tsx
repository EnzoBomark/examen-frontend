import { setChat } from '../actions';
import Store from '../store';

export const useSetChat = () => {
  const dispatch = Store.useDispatch();
  return (chat: Chat) => dispatch(setChat(chat));
};

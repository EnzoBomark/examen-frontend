import { setChats } from '../actions';
import store from '../store';

export const useSetChats = () => {
  const dispatch = store.useDispatch();

  return (chat: Chat) => {
    dispatch(setChats(chat));
  };
};

import api, { AxiosError } from '../../../axios';
import { useSetChat } from '../../multiple/handlers/setChat';
import { fail, pending, unload } from '../actions';
import store from '../store';

export const useResignChat = () => {
  const dispatch = store.useDispatch();
  const setChat = useSetChat();

  const resignChat = (chat: Chat) => {
    dispatch(pending());

    api
      .put<Chat>(`profile/chat/${chat.id}`)
      .then(() => {
        setChat(chat);
        dispatch(unload());
      })
      .catch((err: AxiosError<ResponseError<Chat>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return resignChat;
};

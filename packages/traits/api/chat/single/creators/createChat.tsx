import api, { AxiosError } from '../../../axios';
import { useCreateChat as useSetChat } from '../../multiple/handlers/createChat';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useCreateChat = () => {
  const dispatch = store.useDispatch();
  const setChat = useSetChat();

  const createChat = (users: User[], callback: () => void) => {
    dispatch(pending());

    api
      .post<Chat>(`chat`, {
        userIds: users.map((u) => u.id),
      })
      .then((res) => {
        dispatch(success(res.data));
        setChat(res.data);
        callback();
      })
      .catch((err: AxiosError<ResponseError<Chat>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return createChat;
};

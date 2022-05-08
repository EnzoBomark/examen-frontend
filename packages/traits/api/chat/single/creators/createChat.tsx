import api, { AxiosError } from '../../../index';
import { useAddChat } from '../../multiple/handlers/addChat';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useCreateChat = () => {
  const dispatch = store.useDispatch();
  const addChat = useAddChat();
  const createChat = (users: User[]) => {
    dispatch(pending());

    api
      .post<Chat>(`chat`, {
        userIds: users.map((u) => u.id),
      })
      .then((res) => {
        dispatch(success(res.data));
        addChat(res.data);
      })
      .catch((err: AxiosError<ResponseError<Chat>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return createChat;
};

import api, { AxiosError } from '../../../index';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useCreateChat = () => {
  const dispatch = store.useDispatch();

  const createChat = (users: User[]) => {
    dispatch(pending());

    api
      .post<Chat>(`chat`, {
        userIds: users.map((u) => u.id),
      })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError<Chat>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return createChat;
};

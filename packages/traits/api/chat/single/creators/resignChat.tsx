import api, { AxiosError } from '../../../index';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useResignChat = () => {
  const dispatch = store.useDispatch();

  const resignChat = (chatId: string) => {
    dispatch(pending());

    api
      .put<Chat>(`profile/chat/${chatId}`)
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError<Chat>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return resignChat;
};

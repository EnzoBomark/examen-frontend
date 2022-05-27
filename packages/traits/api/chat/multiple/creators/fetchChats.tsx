import api, { AxiosError } from '../../../axios';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useFetchChats = () => {
  const dispatch = store.useDispatch();

  const fetchChats = (page: number) => {
    dispatch(pending());

    api
      .get<Chat[]>(`profile/chats`, { params: { page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return fetchChats;
};

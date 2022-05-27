import api, { AxiosError } from '../../../axios';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useFetchUser = () => {
  const dispatch = store.useDispatch();

  const fetchUser = (id: string) => {
    dispatch(pending());

    api
      .get<User>(`user/${id}`)
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError<User>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return fetchUser;
};

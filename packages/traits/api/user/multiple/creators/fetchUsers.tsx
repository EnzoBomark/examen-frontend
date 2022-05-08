import api, { AxiosError } from '../../../index';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useFetchUsers = () => {
  const dispatch = store.useDispatch();

  const fetchUsers = (page: number) => {
    dispatch(pending());

    api
      .get<User[]>(`users`, { params: { page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return fetchUsers;
};

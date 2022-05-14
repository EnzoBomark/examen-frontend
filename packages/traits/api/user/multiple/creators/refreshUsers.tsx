import api, { AxiosError } from '../../../axios';
import { fail, pending, refresh } from '../actions';
import store from '../store';

export const useRefreshUsers = () => {
  const dispatch = store.useDispatch();

  const refreshUsers = (name: string) => {
    dispatch(pending());

    api
      .get<User[]>(`users`, { params: { name, page: 0 } })
      .then((res) => dispatch(refresh(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return refreshUsers;
};

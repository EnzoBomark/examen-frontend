import api, { AxiosError } from '../../../../axios';
import { count, fail, pending, success } from '../actions';
import store from '../store';

export const useFetchFollowers = () => {
  const dispatch = store.useDispatch();

  const fetchFollowers = (user: User, page: number) => {
    dispatch(pending());

    api
      .get<User[]>(`user/${user.id}/followers`, { params: { page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });

    api
      .get<{ count: number }>(`user/${user.id}/followers/count`)
      .then((res) => dispatch(count(res.data.count)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return fetchFollowers;
};

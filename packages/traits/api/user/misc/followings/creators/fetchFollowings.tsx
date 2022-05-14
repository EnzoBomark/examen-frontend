import api, { AxiosError } from '../../../../axios';
import { count, fail, pending, success } from '../actions';
import store from '../store';

export const useFetchFollowings = () => {
  const dispatch = store.useDispatch();

  const fetchFollowings = (user: User, page: number) => {
    dispatch(pending());

    api
      .get<User[]>(`user/${user.id}/followings`, { params: { page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });

    api
      .get<{ count: number }>(`user/${user.id}/followings/count`)
      .then((res) => dispatch(count(res.data.count)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return fetchFollowings;
};

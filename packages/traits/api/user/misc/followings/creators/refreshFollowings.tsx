import api, { AxiosError } from '../../../../axios';
import { count, fail, pending, refresh } from '../actions';
import store from '../store';

export const useRefreshFollowings = () => {
  const dispatch = store.useDispatch();

  const refreshFollowings = (user: User) => {
    dispatch(pending());

    api
      .get<User[]>(`user/${user.id}/followings`, { params: { page: 0 } })
      .then((res) => dispatch(refresh(res.data)))
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
  return refreshFollowings;
};

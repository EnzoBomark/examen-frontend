import api, { AxiosError } from '../../../../axios';
import { count, fail, pending, refresh } from '../actions';
import store from '../store';

export const useRefreshHistory = () => {
  const dispatch = store.useDispatch();

  const refreshHistory = (user: User) => {
    dispatch(pending());

    api
      .get<Match[]>(`user/${user.id}/history`, { params: { page: 0 } })
      .then((res) => dispatch(refresh(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });

    api
      .get<{ count: number }>(`user/${user.id}/history/count`)
      .then((res) => dispatch(count(res.data.count)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return refreshHistory;
};

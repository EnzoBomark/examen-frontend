import api, { AxiosError } from '../../../../axios';
import { fail, pending, refresh } from '../actions';
import store from '../store';
import { useCountHistory } from './countHistory';

export const useRefreshHistory = () => {
  const dispatch = store.useDispatch();
  const countHistory = useCountHistory();

  const refreshHistory = (user: User) => {
    dispatch(pending());

    api
      .get<Match[]>(`user/${user.id}/history`, { params: { page: 0 } })
      .then((res) => dispatch(refresh(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });

    countHistory(user);
  };
  return refreshHistory;
};

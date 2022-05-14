import api, { AxiosError } from '../../../../axios';
import { count, fail, pending, success } from '../actions';
import store from '../store';
import { useCountHistory } from './countHistory';

export const useFetchHistory = () => {
  const dispatch = store.useDispatch();
  const countHistory = useCountHistory();

  const fetchHistory = (user: User, page: number) => {
    dispatch(pending());

    api
      .get<Match[]>(`user/${user.id}/history`, { params: { page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });

    countHistory(user);
  };
  return fetchHistory;
};

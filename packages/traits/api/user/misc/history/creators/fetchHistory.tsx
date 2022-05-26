import api, { AxiosError } from '../../../../axios';
import { fail, pending, success } from '../actions';
import store from '../store';
import { useCountHistory } from './countHistory';

export const useFetchHistory = () => {
  const dispatch = store.useDispatch();
  const countHistory = useCountHistory();

  const fetchHistory = (name: string, user: User, page: number) => {
    dispatch(pending());

    api
      .get<Match[]>(`user/${user.id}/history`, { params: { name, page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });

    countHistory(user);
  };
  return fetchHistory;
};

import api, { AxiosError } from '../../../../axios';
import { count, fail, pending, success } from '../actions';
import store from '../store';
import { useCountUpcoming } from './countUpcoming';

export const useFetchUpcoming = () => {
  const dispatch = store.useDispatch();
  const countUpcoming = useCountUpcoming();

  const fetchUpcoming = (user: User, page: number) => {
    dispatch(pending());

    api
      .get<Match[]>(`user/${user.id}/upcoming`, { params: { page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });

    countUpcoming(user);
  };
  return fetchUpcoming;
};

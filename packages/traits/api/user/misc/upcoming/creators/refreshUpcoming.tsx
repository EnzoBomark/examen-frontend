import api, { AxiosError } from '../../../../axios';
import { count, fail, pending, refresh } from '../actions';
import store from '../store';
import { useCountUpcoming } from './countUpcoming';

export const useRefreshUpcoming = () => {
  const dispatch = store.useDispatch();
  const countUpcoming = useCountUpcoming();

  const refreshUpcoming = (name: string, user: User) => {
    dispatch(pending());

    api
      .get<Match[]>(`user/${user.id}/upcoming`, { params: { name, page: 0 } })
      .then((res) => dispatch(refresh(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });

    countUpcoming(user);
  };
  return refreshUpcoming;
};

import api, { AxiosError } from '../../../../axios';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useFetchWinRate = () => {
  const dispatch = store.useDispatch();

  const fetchWinRate = (user: User) => {
    dispatch(pending());

    api
      .get<{ winRate: number }>(`user/${user.id}/win-rate`)
      .then((res) => dispatch(success(res.data.winRate)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return fetchWinRate;
};

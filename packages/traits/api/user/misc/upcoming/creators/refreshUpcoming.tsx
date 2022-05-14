import api, { AxiosError } from '../../../../axios';
import { fail, pending, refresh } from '../actions';
import store from '../store';

export const useRefreshUpcoming = () => {
  const dispatch = store.useDispatch();

  const refreshUpcoming = (user: User) => {
    dispatch(pending());

    api
      .get<Match[]>(`user/${user.id}/upcoming`, { params: { page: 0 } })
      .then((res) => dispatch(refresh(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return refreshUpcoming;
};

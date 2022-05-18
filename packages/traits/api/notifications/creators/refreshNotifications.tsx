import api, { AxiosError } from '../../axios';
import { fail, pending, refresh } from '../actions';
import store from '../store';

export const useRefreshNotifications = () => {
  const dispatch = store.useDispatch();

  const refreshNotifications = () => {
    dispatch(pending());

    api
      .get<CombinedNotification[]>(`profile/notifications`, {
        params: { page: 0 },
      })
      .then((res) => dispatch(refresh(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return refreshNotifications;
};

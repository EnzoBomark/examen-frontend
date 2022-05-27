import api, { AxiosError } from '../../axios';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useFetchNotifications = () => {
  const dispatch = store.useDispatch();

  const fetchNotifications = (page: number) => {
    dispatch(pending());

    api
      .get<CombinedNotification[]>(`profile/notifications`, {
        params: { page },
      })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return fetchNotifications;
};

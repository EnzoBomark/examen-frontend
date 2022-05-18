import api, { AxiosError } from '../../axios';
import { fail, updateReadStatus } from '../actions';
import store from '../store';

export const useUpdateStatus = () => {
  const dispatch = store.useDispatch();

  const updateStatus = () => {
    api
      .put<CombinedNotification[]>(`notifications/status`)
      .then(() => dispatch(updateReadStatus()))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return updateStatus;
};

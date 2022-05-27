import api, { AxiosError } from '../../../axios';
import { fail, pending, refresh } from '../actions';
import store from '../store';

export const useRefreshCenters = () => {
  const dispatch = store.useDispatch();

  const refreshCenters = (query: string) => {
    dispatch(pending());

    api
      .get<Center[]>(`centers`, { params: { query, page: 0 } })
      .then((res) => dispatch(refresh(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return refreshCenters;
};

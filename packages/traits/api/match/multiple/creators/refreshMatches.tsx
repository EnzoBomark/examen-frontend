import api, { AxiosError } from '../../../index';
import { fail, pending, success, unload } from '../actions';
import store from '../store';

export const useRefreshMatches = () => {
  const dispatch = store.useDispatch();

  const refreshMatches = () => {
    dispatch(pending());

    dispatch(unload());

    api
      .get<Match[]>(`matches`, { params: { page: 0 } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return refreshMatches;
};

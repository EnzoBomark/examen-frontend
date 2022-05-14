import api, { AxiosError } from '../../../axios';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useFetchMatches = () => {
  const dispatch = store.useDispatch();

  const fetchMatches = (page: number) => {
    dispatch(pending());

    api
      .get<Match[]>(`matches`, { params: { page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return fetchMatches;
};

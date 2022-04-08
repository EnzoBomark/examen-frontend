import api, { AxiosError } from '../../../index';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useGetMatches = () => {
  const dispatch = store.useDispatch();

  const getMatches = (page: number) => {
    dispatch(pending());

    api
      .get<Match[]>(`matches`, { params: { page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return getMatches;
};

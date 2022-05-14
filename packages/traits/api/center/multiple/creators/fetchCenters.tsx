import api, { AxiosError } from '../../../axios';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useFetchCenters = () => {
  const dispatch = store.useDispatch();

  const fetchCenters = (query: string, page: number) => {
    dispatch(pending());

    api
      .get<Center[]>(`centers`, { params: { query, page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return fetchCenters;
};

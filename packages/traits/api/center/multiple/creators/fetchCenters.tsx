import api, { AxiosError } from '../../../index';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useFetchCenters = () => {
  const dispatch = store.useDispatch();

  const fetchCenters = (page: number) => {
    dispatch(pending());

    api
      .get<Center[]>(`centers`, { params: { page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return fetchCenters;
};

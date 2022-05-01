import api, { AxiosError } from '../../../index';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useFetchCenter = () => {
  const dispatch = store.useDispatch();

  const fetchCenter = (id: string) => {
    dispatch(pending());

    api
      .get<Center>(`center/${id}`)
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError<Center>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return fetchCenter;
};

import api, { AxiosError } from '../../../index';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useGetMatch = () => {
  const dispatch = store.useDispatch();

  const getMatch = (id: string) => {
    dispatch(pending());

    api
      .get<Match>(`match/${id}`)
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError<Match>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return getMatch;
};

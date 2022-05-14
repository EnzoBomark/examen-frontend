import api, { AxiosError } from '../../../axios';
import { fail, pending, success } from '../actions';
import store from '../store';

export const usePutMatch = () => {
  const dispatch = store.useDispatch();

  const putMatch = (id: string, data: Partial<Match>) => {
    dispatch(pending());

    return api
      .put<Match>(`match/${id}`, data)
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };

  return putMatch;
};

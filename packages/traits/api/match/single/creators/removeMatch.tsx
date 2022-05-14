import api, { AxiosError } from '../../../axios';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useDeleteMatch = () => {
  const dispatch = store.useDispatch();

  const deleteMatch = (id: string) => {
    dispatch(pending());

    api
      .delete<Match>(`match/${id}`)
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError<Match>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return deleteMatch;
};

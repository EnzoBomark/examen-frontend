import api, { AxiosError } from '../../../axios';
import { fail, pending, unload } from '../actions';
import store from '../store';

export const useDeleteMatch = () => {
  const dispatch = store.useDispatch();

  const deleteMatch = (match: Match) => {
    dispatch(pending());

    api
      .delete<Match>(`match/${match.id}`)
      .then(() => dispatch(unload()))
      .catch((err: AxiosError<ResponseError<Match>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return deleteMatch;
};

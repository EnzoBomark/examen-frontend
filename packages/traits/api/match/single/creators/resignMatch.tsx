import api, { AxiosError } from '../../../index';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useResignMatch = () => {
  const dispatch = store.useDispatch();

  const resignMatch = (matchId: string) => {
    dispatch(pending());

    api
      .put<Match>(`profile/match/${matchId}`)
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError<Match>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return resignMatch;
};

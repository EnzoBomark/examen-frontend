import api, { AxiosError } from '../../../axios';
import { fail, kickPlayer, pending } from '../actions';
import store from '../store';

export const useKickPlayer = () => {
  const dispatch = store.useDispatch();

  return (match: Match, user: User) => {
    dispatch(pending());
    api
      .put<Match>(`match/${match.id}/kick/${user.id}`)
      .then(() => dispatch(kickPlayer(user)))
      .catch((err: AxiosError<ResponseError<Match>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
};

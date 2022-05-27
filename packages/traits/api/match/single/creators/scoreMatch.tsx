import api, { AxiosError } from '../../../axios';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useScoreMatch = () => {
  const dispatch = store.useDispatch();

  return (match: Match, teamOneScore: number, teamTwoScore: number) => {
    dispatch(pending());

    return api
      .put<Match>(`match/${match.id}`, {
        teamOneScore,
        teamTwoScore,
        isPlayed: true,
      })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
};

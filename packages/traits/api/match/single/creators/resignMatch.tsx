import api, { AxiosError } from '../../../axios';
import { useSetChats } from '../../../chat';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useResignMatch = () => {
  const dispatch = store.useDispatch();
  const setChats = useSetChats();

  const resignMatch = (match: Match, position?: '0' | '1' | '2' | '3') => {
    dispatch(pending());

    api
      .put<Match>(`profile/match/${match.id}`, { position })
      .then((res) => {
        setChats(res.data.chat as Chat);
        dispatch(success(res.data));
      })
      .catch((err: AxiosError<ResponseError<Match>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return resignMatch;
};

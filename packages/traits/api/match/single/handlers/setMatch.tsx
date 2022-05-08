import { setMatch } from '../actions';
import store from '../store';

export const useSetMatch = () => {
  const dispatch = store.useDispatch();
  return (match: Match) => dispatch(setMatch(match));
};

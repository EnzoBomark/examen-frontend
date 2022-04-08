import { matchSelector } from './selectors';
import { setMatch, unload } from './actions';
import Store from './store';

export * from './creators/getMatch';
export * from './creators/postMatch';
export * from './creators/putMatch';
export * from './creators/deleteMatch';

export const useMatch = () => Store.useSelector(matchSelector);

export const useSetMatch = () => {
  const dispatch = Store.useDispatch();
  return (match: Match) => dispatch(setMatch(match));
};

export const useUnloadMatch = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

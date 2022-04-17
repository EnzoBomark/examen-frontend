import { matchesSelector } from './selectors';
import { unload } from './actions';
import Store from './store';

export * from './creators/getMatches';
export * from './creators/refreshMatches';

export const useMatches = () => Store.useSelector(matchesSelector);

export const useUnloadMatches = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

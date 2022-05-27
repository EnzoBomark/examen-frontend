import { unload } from '../actions';
import Store from '../store';

export const useUnloadMatches = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

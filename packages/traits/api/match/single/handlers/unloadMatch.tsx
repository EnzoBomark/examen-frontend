import { unload } from '../actions';
import Store from '../store';

export const useUnloadMatch = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

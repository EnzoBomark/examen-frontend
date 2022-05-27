import { unload } from '../actions';
import Store from '../store';

export const useUnloadHistory = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

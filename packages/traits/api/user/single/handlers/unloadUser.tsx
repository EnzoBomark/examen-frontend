import { unload } from '../actions';
import Store from '../store';

export const useUnloadUser = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

import { unload } from '../actions';
import Store from '../store';

export const useUnloadUsers = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

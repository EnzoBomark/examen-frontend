import { unload } from '../actions';
import Store from '../store';

export const useUnloadProfile = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

import { unload } from '../actions';
import Store from '../store';

export const useUnloadFollowers = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

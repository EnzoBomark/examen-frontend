import { unload } from '../actions';
import Store from '../store';

export const useUnloadFollowings = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

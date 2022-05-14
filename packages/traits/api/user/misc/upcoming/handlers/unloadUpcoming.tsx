import { unload } from '../actions';
import Store from '../store';

export const useUnloadUpcoming = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

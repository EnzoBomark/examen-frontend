import { unload } from '../actions';
import Store from '../store';

export const useUnloadCenter = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

import { unload } from '../actions';
import Store from '../store';

export const useUnloadWinRate = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

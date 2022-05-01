import { unload } from '../actions';
import Store from '../store';

export const useUnloadChats = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

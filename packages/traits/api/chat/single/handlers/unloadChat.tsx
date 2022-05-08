import { unload } from '../actions';
import Store from '../store';

export const useUnloadChat = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

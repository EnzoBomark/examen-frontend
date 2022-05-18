import { unload } from '../actions';
import Store from '../store';

export const useUnloadNotifications = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

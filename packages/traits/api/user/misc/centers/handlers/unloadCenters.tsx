import { unload } from '../actions';
import Store from '../store';

export const useUnloadCenters = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

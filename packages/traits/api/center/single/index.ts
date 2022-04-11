import { centerSelector } from './selectors';
import { unload } from './actions';
import Store from './store';

export * from './creators/getCenter';

export const useCenter = () => Store.useSelector(centerSelector);

export const useUnloadCenter = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

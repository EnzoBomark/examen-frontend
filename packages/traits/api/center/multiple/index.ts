import { centersSelector } from './selectors';
import { unload } from './actions';
import Store from './store';

export * from './creators/getMatches';
export * from './creators/refreshMatches';

export const useCenters = () => Store.useSelector(centersSelector);

export const useUnloadCenters = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

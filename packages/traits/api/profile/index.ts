import { profileSelector } from './selectors';
import { setProfile, unload } from './actions';
import { Profile } from './types';
import Store from './store';

export const useProfile = () => Store.useSelector(profileSelector);

export { useGetProfile } from './creators/getProfile';

export { usePutProfile } from './creators/putProfile';

export const useSetProfile = () => {
  const dispatch = Store.useDispatch();
  return (profile: Profile) => dispatch(setProfile(profile));
};

export const useUnloadProfile = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

import { profileSelector } from './selectors';
import { setProfile, unload } from './actions';
import { Profile } from './types';
import Store from './store';

export * from './creators/getProfile';
export * from './creators/postProfile';
export * from './creators/putProfile';

export const useProfile = () => Store.useSelector(profileSelector);

export const useSetProfile = () => {
  const dispatch = Store.useDispatch();
  return (profile: Profile) => dispatch(setProfile(profile));
};

export const useUnloadProfile = () => {
  const dispatch = Store.useDispatch();
  return () => dispatch(unload());
};

import { profileSelector } from './selectors';
import { setProfile } from './actions';
import { Profile } from './types';
import Store from './store';

export const useProfile = () => Store.useSelector(profileSelector);

export const useDispatchSetProfile = () => {
  const dispatch = Store.useDispatch();

  return (profile: Profile) => {
    dispatch(setProfile(profile));
  };
};

export { useGetProfile } from './creators/getProfile';

export { usePutProfile } from './creators/putProfile';

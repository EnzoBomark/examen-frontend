import { setProfile } from '../actions';
import store from '../store';

export const useSetProfile = () => {
  const dispatch = store.useDispatch();
  return (profile: User) => dispatch(setProfile(profile));
};

import { useProfile } from '../../../profile';
import { resignFollow } from '../actions';
import store from '../store';

export const useSetFollow = () => {
  const dispatch = store.useDispatch();
  const profile = useProfile();

  const setFollow = (user: User) => {
    dispatch(resignFollow(user, profile.data));
  };
  return setFollow;
};

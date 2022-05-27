import { useProfile } from '../../../profile';
import { resignBookmark } from '../actions';
import store from '../store';

export const useSetBookmark = () => {
  const dispatch = store.useDispatch();
  const profile = useProfile();

  const setBookmark = (center: Center) => {
    dispatch(resignBookmark(center, profile.data));
  };
  return setBookmark;
};

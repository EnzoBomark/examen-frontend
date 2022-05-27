import { setUser } from '../actions';
import store from '../store';

export const useSetUser = () => {
  const dispatch = store.useDispatch();
  return (user: User) => dispatch(setUser(user));
};

import { updateUsers } from '../actions';
import store from '../store';

export const useUpdateUsers = () => {
  const dispatch = store.useDispatch();

  return async (chat?: Chat, users?: User[]) => {
    dispatch(updateUsers(users as User[], chat as Chat));
  };
};

import { setNotification } from '../actions';
import store from '../store';

export const useSetNotification = () => {
  const dispatch = store.useDispatch();
  return (notification: InviteNotification) =>
    dispatch(setNotification(notification));
};

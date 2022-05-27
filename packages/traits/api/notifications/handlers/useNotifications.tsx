import { notificationsSelector } from '../selectors';
import Store from '../store';

export const useNotifications = () => Store.useSelector(notificationsSelector);

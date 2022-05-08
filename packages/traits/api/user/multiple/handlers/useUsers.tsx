import { usersSelector } from '../selectors';
import Store from '../store';

export const useUsers = () => Store.useSelector(usersSelector);

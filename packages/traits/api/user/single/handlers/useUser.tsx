import { userSelector } from '../selectors';
import Store from '../store';

export const useUser = () => Store.useSelector(userSelector);

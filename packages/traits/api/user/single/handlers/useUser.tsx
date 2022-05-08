import { userSelector } from '../selectors';
import Store from '../store';

export const useMatch = () => Store.useSelector(userSelector);

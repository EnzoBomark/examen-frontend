import { matchSelector } from '../selectors';
import Store from '../store';

export const useMatch = () => Store.useSelector(matchSelector);

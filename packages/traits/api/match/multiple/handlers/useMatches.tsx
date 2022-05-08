import { matchesSelector } from '../selectors';
import Store from '../store';

export const useMatches = () => Store.useSelector(matchesSelector);

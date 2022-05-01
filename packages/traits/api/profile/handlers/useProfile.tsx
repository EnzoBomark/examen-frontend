import { profileSelector } from '../selectors';
import Store from '../store';

export const useProfile = () => Store.useSelector(profileSelector);

import { followersSelector } from '../selectors';
import Store from '../store';

export const useHistory = () => Store.useSelector(followersSelector);

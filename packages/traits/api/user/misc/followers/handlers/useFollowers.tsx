import { followersSelector } from '../selectors';
import Store from '../store';

export const useFollowers = () => Store.useSelector(followersSelector);

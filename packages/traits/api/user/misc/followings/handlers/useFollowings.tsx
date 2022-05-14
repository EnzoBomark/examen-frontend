import { followingsSelector } from '../selectors';
import Store from '../store';

export const useFollowings = () => Store.useSelector(followingsSelector);

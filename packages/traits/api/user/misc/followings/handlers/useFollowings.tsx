import { followingsSelector } from '../selectors';
import Store from '../store';

export const useHistory = () => Store.useSelector(followingsSelector);

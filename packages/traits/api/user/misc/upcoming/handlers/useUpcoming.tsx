import { upcomingSelector } from '../selectors';
import Store from '../store';

export const useUpcoming = () => Store.useSelector(upcomingSelector);

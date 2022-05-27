import { centersSelector } from '../selectors';
import Store from '../store';

export const useCenters = () => Store.useSelector(centersSelector);

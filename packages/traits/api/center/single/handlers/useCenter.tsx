import { centerSelector } from '../selectors';
import Store from '../store';

export const useCenter = () => Store.useSelector(centerSelector);

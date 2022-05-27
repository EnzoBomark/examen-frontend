import { winRateSelector } from '../selectors';
import Store from '../store';

export const useWinRate = () => Store.useSelector(winRateSelector);

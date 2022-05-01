import { chatsSelector } from '../selectors';
import Store from '../store';

export const useChats = () => Store.useSelector(chatsSelector);

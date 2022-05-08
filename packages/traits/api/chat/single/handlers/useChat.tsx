import { chatSelector } from '../selectors';
import Store from '../store';

export const useChat = () => Store.useSelector(chatSelector);

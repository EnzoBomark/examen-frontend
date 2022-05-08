import { addMessages } from '../actions';
import Store from '../store';

export const useAddMessages = () => {
  const dispatch = Store.useDispatch();
  return (messages: Message[], chat: Chat) =>
    dispatch(addMessages(messages, chat));
};

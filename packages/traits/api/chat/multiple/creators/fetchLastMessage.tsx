import database from '@react-native-firebase/database';
import { useAddMessages } from '../../single/handlers/addMessages';
import { fail, pushMessages } from '../actions';
import store from '../store';

export const useFetchLastMessages = () => {
  const dispatch = store.useDispatch();
  const addMessages = useAddMessages();

  const fetchLastMessages = async (chat: Chat) => {
    try {
      const messagesRef = database().ref(`/chat_rooms/${chat.id}`);

      const messagesSnapShot = await messagesRef
        .orderByKey()
        .limitToLast(1)
        .once('value');

      const messages: Message[] = [];

      messagesSnapShot.forEach((message) => {
        messages.push({
          key: message.key,
          uid: message.val().uid,
          message: message.val().message,
          time: message.val().time,
        });

        return undefined;
      });

      addMessages(messages, chat);
      dispatch(pushMessages(messages, chat));
    } catch (err) {
      dispatch(
        fail({
          statusCode: 422,
          error: 'Get messages failed',
          message: (err as Error).message,
        })
      );
    }
  };

  return fetchLastMessages;
};

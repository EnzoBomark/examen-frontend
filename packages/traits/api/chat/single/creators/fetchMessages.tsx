import database from '@react-native-firebase/database';
import { fail, initMessages } from '../actions';
import store from '../store';

export const useFetchMessages = () => {
  const dispatch = store.useDispatch();
  const fetchMessages = async (chat: Chat) => {
    try {
      const messagesRef = database().ref(`/chat_rooms/${chat.id}`);

      const current = chat.messages;

      const startingPoint = current.length
        ? current[current.length - 1].key
        : '';

      messagesRef.startAt(startingPoint);

      const messagesSnapShot = await messagesRef
        .orderByKey()
        .limitToLast(50)
        .once('value');

      const messages: Message[] = [];

      await messagesSnapShot.forEach((message) => {
        messages.push({
          key: message.key,
          uid: message.val().uid,
          message: message.val().message,
          time: message.val().time,
        });

        return undefined;
      });

      dispatch(initMessages(messages, chat));
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

  return fetchMessages;
};

import database from '@react-native-firebase/database';
import { useChat } from '../handlers/useChat';
import { fail, initMessages, updateReadStatuses } from '../actions';
import store from '../store';

export const useFetchMessages = () => {
  const dispatch = store.useDispatch();
  const chat = useChat();

  const fetchMessages = async () => {
    try {
      const messagesRef = database().ref(`/chat_rooms/${chat.data.id}`);

      const current = chat.data.messages;

      const startingPoint = current.length
        ? current[current.length - 1].key
        : '';

      messagesRef.startAt(startingPoint);

      const messagesSnapShot = await messagesRef
        .orderByKey()
        .limitToLast(50)
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

      const statusRef = database().ref(`/chat_rooms_status/${chat.data.id}`);

      const statusSnapShot = await statusRef.once('value');

      const readStatus: ReadStatus[] = [];

      statusSnapShot.forEach((status) => {
        readStatus.push({
          id: status.val().uid,
          isRead: status.val().is_read,
        });

        return undefined;
      });

      dispatch(initMessages(messages));
      dispatch(updateReadStatuses(readStatus));
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

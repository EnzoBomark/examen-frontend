import database from '@react-native-firebase/database';
import { useChat } from '../handlers/useChat';
import { useProfile } from '../../../profile';
import { fail } from '../actions';
import store from '../store';

export const useSendMessage = () => {
  const dispatch = store.useDispatch();
  const profile = useProfile();
  const chat = useChat();

  const sendMessage = async (message: string) => {
    try {
      const messagesRef = database().ref(`/chat_rooms/${chat.data.id}`);

      messagesRef.push().set({
        message: message.trim(),
        uid: profile.data.id,
        time: database.ServerValue.TIMESTAMP,
      });

      const statusRef = database().ref(`/chat_rooms_status/${chat.data.id}`);

      statusRef.once('value', (users) => {
        users.forEach((user) => {
          if (user.val().uid === profile.data.id) return;

          user.ref.update({
            is_read: false,
          });

          return undefined;
        });
      });
    } catch (err) {
      dispatch(
        fail({
          statusCode: 422,
          error: 'send message failed',
          message: (err as Error).message,
        })
      );
    }
  };

  return sendMessage;
};

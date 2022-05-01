import database from '@react-native-firebase/database';
import { useChat } from '../handlers/useChat';
import { useProfile } from '../../../profile';
import { fail } from '../actions';
import store from '../store';

export const useMarkAsRead = () => {
  const dispatch = store.useDispatch();
  const profile = useProfile();
  const chat = useChat();

  const markAsRead = async () => {
    try {
      const statusRef = database().ref(`/chat_rooms_status/${chat.data.id}`);

      statusRef.once('value', (users) => {
        users.forEach((user) => {
          if (user.val().uid !== profile.data.id) return;

          user.ref.update({
            is_read: true,
          });

          return undefined;
        });
      });
    } catch (err) {
      dispatch(
        fail({
          statusCode: 422,
          error: 'Mark as read failed',
          message: (err as Error).message,
        })
      );
    }
  };

  return markAsRead;
};

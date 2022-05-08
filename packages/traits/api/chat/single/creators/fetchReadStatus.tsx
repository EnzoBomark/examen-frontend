import database from '@react-native-firebase/database';

import { fail } from '../actions';
import store from '../store';
import { useSetReadStatus } from '../../multiple/handlers/setReadStatus';

export const useFetchReadStatus = () => {
  const dispatch = store.useDispatch();
  const setReadStatus = useSetReadStatus();

  const fetchReadStatus = async (chat: Chat) => {
    try {
      const statusRef = database().ref(`/chat_rooms_status/${chat.id}`);

      const statusSnapShot = await statusRef.once('value');

      const readStatus: ReadStatus[] = [];

      statusSnapShot.forEach((status) => {
        readStatus.push({
          id: status.val().uid,
          isRead: status.val().is_read,
        });

        return undefined;
      });

      setReadStatus(readStatus, chat);
    } catch (err) {
      dispatch(
        fail({
          statusCode: 422,
          error: 'Get read status failed',
          message: (err as Error).message,
        })
      );
    }
  };

  return fetchReadStatus;
};

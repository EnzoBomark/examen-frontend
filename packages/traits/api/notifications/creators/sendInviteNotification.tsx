import api from '../../axios';
import { useSetNotification } from '../../match';

export const useSendInviteNotification = () => {
  const setNotification = useSetNotification();

  const sendInviteNotification = (user: User, match: Match) => {
    api
      .post<InviteNotification>(`notification/invite`, {
        matchId: match.id,
        receiverId: user.id,
      })
      .then((res) => setNotification(res.data));
  };
  return sendInviteNotification;
};

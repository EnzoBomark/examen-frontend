import api, { AxiosError } from '../../axios';

export const useSendFollowNotification = () => {
  const sendFollowNotification = (user: User) => {
    api.post<FollowNotification>(`notification/follow`, {
      receiverId: user.id,
    });
  };
  return sendFollowNotification;
};

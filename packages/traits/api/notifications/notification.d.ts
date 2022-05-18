type FollowNotification = {
  type: 'follow';
  id: string;
  isRead: boolean;
  senderId?: string;
  receiverId?: string;
};

type InviteNotification = {
  type: 'invite';
  id: string;
  isRead: boolean;
  senderId?: string;
  matchId?: string;
  receiverId?: string;
};

type ResultNotification = {
  type: 'result';
  id: string;
  isRead: boolean;
  matchId?: string;
  receiverId?: string;
};

type CombinedNotification =
  | FollowNotification
  | InviteNotification
  | ResultNotification;

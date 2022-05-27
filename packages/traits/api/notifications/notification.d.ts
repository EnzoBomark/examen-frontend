type FollowNotification = {
  type: 'follow';
  id: string;
  isRead: boolean;
  sender?: User;
  receiver?: User;
};

type InviteNotification = {
  type: 'invite';
  id: string;
  isRead: boolean;
  match?: Match;
  sender?: User;
  receiver?: User;
};

type ResultNotification = {
  type: 'result';
  id: string;
  isRead: boolean;
  match?: Match;
  receiver?: User;
};

type CombinedNotification =
  | FollowNotification
  | InviteNotification
  | ResultNotification;

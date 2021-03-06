type Message = {
  key: string | null;
  uid: string;
  message: string;
  time: string;
};

type ReadStatus = {
  id: string;
  isRead: boolean;
};

type Chat = {
  users: User[];
  messages: Message[];
  readStatus: ReadStatus[];
  id: string;
  type: 'match' | 'group' | 'user';
};

type FormattedMessage = {
  key: string | null;
  isPrevSameId: boolean;
  isMe: boolean;
  message: string;
  time: string;
  name?: string;
  date?: string;
  user?: User;
};

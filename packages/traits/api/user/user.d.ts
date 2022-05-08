type UsersMatches = {
  position: string;
  isAdmin: boolean;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  picture?: string;
  description?: string;
  skill?: '0' | '1' | '2' | '3' | '4' | '5';
  isRightHand?: boolean;
  fcm?: string;
  usersMatches?: UsersMatches;
  followings: User[];
  followers: User[];
};

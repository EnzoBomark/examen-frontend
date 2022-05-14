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
  birthDate?: string;
  description?: string;
  isRightHand?: boolean;
  fcm?: string;
  skill?: '0' | '1' | '2' | '3' | '4' | '5';
  usersMatches?: UsersMatches;
  followers: User[];
  followings: User[];
};

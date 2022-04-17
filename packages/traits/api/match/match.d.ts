type Match = {
  id: string;
  dateTime: string;
  type: 'single' | 'double';
  duration: '60' | '90' | '120';
  currency: 'SEK' | 'EUR';
  court?: string;
  price?: string;
  phone?: string;
  result?: string;
  isPublic?: boolean;
  isPlayed?: boolean;
  isBooked?: boolean;
  centerId?: string;
  center?: Center;
  users?: User[];
};

type ExtendedMatch = {
  centerName?: string;
  centerAddress?: string;
  userOne?: User;
  userTwo?: User;
  userThree?: User;
  userFour?: User;
  admin?: User;
  skill?: number[];
  isPlayer?: boolean;
  isAdmin?: boolean;
  isSingle?: boolean;
  isMe?: (user: User) => boolean;
} & Match;

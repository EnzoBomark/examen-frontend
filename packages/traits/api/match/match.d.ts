type Match = {
  id: string;
  dateTime: string;
  type: 'single' | 'double';
  duration: '60' | '90' | '120';
  currency: 'SEK' | 'EUR';
  skill?: '0' | '1' | '2' | '3' | '4' | '5';
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

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
  description?: string;
  center?: Center;
  users?: User[];
};

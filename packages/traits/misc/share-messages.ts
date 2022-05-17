import { getTime, getDate } from '@racket-traits/utils';

export const matchShare = (match: Match, type: 'tennis' | 'paddel') => {
  const count = (match.type === 'single' ? 2 : 4) - (match.users?.length || 0);

  return `Hi! I’m looking for ${count} ${
    count === 1 ? 'player' : 'players'
  } to join my ${type} match
  Time: ${getDate(match.dateTime)} at ${getTime(match.dateTime)}
  Place: ${match.center?.name}`;
};

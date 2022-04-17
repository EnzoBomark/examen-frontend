const dayDiff = (messageDate: Date) => {
  const today = new Date();
  today.setHours(0, 0);

  const diff =
    (messageDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000);

  return Math.round(diff);
};

export const getWeekday = (time: string | number) => {
  const date = new Date(time);

  return [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][date.getDay()];
};

const twoDigit = (number: number) => ('0' + number).slice(-2);

export const getDate = (time: string | number) => {
  const date = new Date(time);

  date.setHours(0, 0);

  const abbreviation = ['Yesterday', 'Today', 'Tomorrow'][dayDiff(date) + 1];

  const fullDate = `${date.getDate()}/${date.getMonth() + 1}`;

  return abbreviation || fullDate;
};

export const getTime = (time: string | number) => {
  const date = new Date(time);

  const hours = twoDigit(date.getHours());
  const minutes = twoDigit(date.getMinutes());

  return `${hours}:${minutes}`;
};

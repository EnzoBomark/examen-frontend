import { useProfile } from '../profile';

export const useCenterFunctions = () => {
  const profile = useProfile();

  const formatAddress = (address: string) => {
    const i = address.indexOf(',') - 6;

    return (
      address.substring(0, i) +
      '\n' +
      address.substring(i, address.length)
    ).replace(',', '');
  };

  const isBookmarked = (center: Center) =>
    center.users.some((u) => u.id === profile.data.id);

  return {
    formatAddress,
    isBookmarked,
  };
};

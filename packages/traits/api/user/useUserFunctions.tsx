import { useProfile } from '../profile';

export const useUserFunctions = () => {
  const profile = useProfile();

  const isFriends = (user: User) =>
    user.followers.some((u) => u.id === profile.data.id);

  return {
    isFriends,
  };
};

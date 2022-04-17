import { useTranslation } from '@racket-traits/lang';
import { useProfile } from '../profile';

export const useMatchFunctions = () => {
  const { match: t } = useTranslation();
  const profile = useProfile();

  const getUser = (
    users: User[] | undefined,
    position: '0' | '1' | '2' | '3'
  ) => users?.find((user) => user.usersMatches?.position === position);

  const getAdmin = (users: User[] | undefined) =>
    users?.find((user) => user.usersMatches?.isAdmin);

  const getSkill = (users: User[] | undefined) => {
    const skill = users?.map((user) => Number(user.skill)) || [];

    return users?.length === 1
      ? `${t.rank} ${skill[0]}`
      : `${t.rank} ${
          Math.min(...skill) === Math.max(...skill)
            ? Math.max(...skill)
            : `${Math.min(...skill)}  - ${Math.max(...skill)}`
        }`;
  };

  const isMe = (user?: User) => user?.id === profile.data.id;

  const isPlayer = (users?: User[]) =>
    users?.some((user) => user.id === profile.data.id);

  const isAdmin = (users?: User[]) => getAdmin(users)?.id === profile.data.id;

  const isSingle = (match?: Match) => match?.type === 'single';

  return {
    getUser,
    getAdmin,
    getSkill,
    isMe,
    isPlayer,
    isAdmin,
    isSingle,
  };
};

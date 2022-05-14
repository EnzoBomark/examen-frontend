import { useUnloadProfile } from '../profile';
import { useUnloadCenter, useUnloadCenters } from '../center';
import { useUnloadChat, useUnloadChats } from '../chat';
import { useUnloadMatch, useUnloadMatches } from '../match';
import { useUnloadUser, useUnloadUsers } from '../user';

export const useUnloadAppState = () => {
  const unloadProfile = useUnloadProfile();
  const unloadCenter = useUnloadCenter();
  const unloadCenters = useUnloadCenters();
  const unloadMatch = useUnloadMatch();
  const unloadMatches = useUnloadMatches();
  const unloadUser = useUnloadUser();
  const unloadUsers = useUnloadUsers();
  const unloadChat = useUnloadChat();
  const unloadChats = useUnloadChats();

  return () => {
    unloadProfile();
    unloadCenter();
    unloadCenters();
    unloadMatch();
    unloadMatches();
    unloadUser();
    unloadUsers();
    unloadChat();
    unloadChats();
  };
};

import { useTranslation } from '@racket-traits/lang';
import { useProfile } from '../profile';

export const useChatFunctions = () => {
  const { chat: t } = useTranslation();
  const profile = useProfile();

  return {};
};

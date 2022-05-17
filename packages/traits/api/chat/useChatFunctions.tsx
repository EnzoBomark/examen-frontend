import { useTranslation } from '@racket-traits/lang';
import { compare } from '@racket-traits/utils';
import { useProfile } from '../profile';

export const useChatFunctions = () => {
  const { chat: t } = useTranslation();
  const profile = useProfile();

  const getMemberCount = (chat: Chat) =>
    `${chat.users?.length} ${chat.users?.length === 1 ? t.member : t.members}`;

  const getLabel = (chat: Chat) =>
    chat.users
      .filter((u) => u.id !== profile.data.id)
      .map((u) => u.name)
      .join(', ') || '-';

  const getPrefix = (message: Message, users: User[]) => {
    return `${
      users.find((user) => user.id === message.uid)?.id === profile.data.id
        ? t.prefix
        : users.length > 2
        ? `${users.find((user) => user.id === message.uid)?.name}: `
        : ''
    }${message.message}`;
  };

  const getReadStatus = (chat: Chat) =>
    chat.readStatus.find((status) => status.id === profile.data.id)?.isRead;

  const formatMessages = (chat: Chat) => {
    return chat.messages
      .reduce((acc, message, index) => {
        const prevMessage = chat.messages[index - 1];
        const nextMessage = chat.messages[index + 1];

        const isPrevSameSpan = prevMessage?.time + 86400000 > message.time;
        const isNextSameSpan = message.time + 86400000 > nextMessage?.time;

        const isPrevSameId = prevMessage
          ? prevMessage?.uid === message?.uid
          : false;

        const isNextSameId = nextMessage
          ? nextMessage?.uid === message?.uid
          : false;

        const formattedMessage: FormattedMessage = {
          isPrevSameId,
          message: message.message,
          time: message.time,
          isMe: message.uid === profile.data.id,
        };

        if (nextMessage && !isPrevSameSpan) {
          formattedMessage.date = message.time;
        }

        if (!isPrevSameId || !isPrevSameSpan)
          formattedMessage.name =
            chat.users.find((u) => u.id === message.uid)?.name || t.user_left;

        if (!isNextSameId || !isNextSameSpan)
          formattedMessage.picture =
            chat.users.find((u) => u.id === message.uid)?.picture ||
            'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png';

        return [...acc, formattedMessage];
      }, [] as Array<FormattedMessage>)
      .reverse();
  };

  const sortChats = (chats: Chat[], query: string) =>
    chats
      .filter((chat) => chat.users.length > 1)
      .filter((chat) => chat.type.includes(''))
      .reduce(
        (acc: Chat[], curr) =>
          !compare(query, getLabel(curr)).some((i) => i === false)
            ? [...acc, curr]
            : acc,
        []
      )
      .sort(
        (a, b) =>
          (!!a.messages?.length
            ? Number(a.messages[a.messages.length - 1].time)
            : 0) -
          (!!b.messages?.length
            ? Number(b.messages[b.messages.length - 1].time)
            : -chats.length)
      )
      .reverse();

  return {
    formatMessages,
    sortChats,
    getLabel,
    getPrefix,
    getReadStatus,
    getMemberCount,
  };
};

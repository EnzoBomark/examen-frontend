import auth from '@react-native-firebase/auth';

export type FormattedMessage = {
  isPrevSameId: boolean;
  isMe: boolean;
  message: string;
  time: string;
  name?: string;
  picture?: string;
  date?: string;
};

export const formatMessages = (chat: Chat) => {
  return chat.messages
    .reduce((acc, message, index) => {
      const prevMessage = chat.messages[index - 1];
      const nextMessage = chat.messages[index + 1];

      // Time span is 1 day
      const isPrevSameSpan = prevMessage?.time + 86_400_000 > message.time;
      const isNextSameSpan = message.time + 86_400_000 > nextMessage?.time;

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
        isMe: message.uid === auth().currentUser?.uid,
      };

      if (nextMessage && !isPrevSameSpan) {
        formattedMessage.date = message.time;
      }

      if (!isPrevSameId || !isPrevSameSpan)
        formattedMessage.name =
          chat.users.find((u) => u.id === message.uid)?.name || 'user left';

      if (!isNextSameId || !isNextSameSpan)
        formattedMessage.picture =
          chat.users.find((u) => u.id === message.uid)?.picture ||
          'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png';

      return [...acc, formattedMessage];
    }, [] as Array<FormattedMessage>)
    .reverse();
};

import * as React from 'react';
import * as Native from 'react-native';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import * as Hooks from '@racket-traits/hooks';
import { useTranslation } from '@racket-traits/lang';
import { StackScreenProps } from '@react-navigation/stack';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import { getTime, getDate, getWeekday } from '@racket-traits/utils';
import { matchShare } from '@racket-traits/misc';
import { useChats, useSetChat } from '@racket-traits/api/chat';
import {
  useDeleteMatch,
  useMatch,
  useMatchFunctions,
  useResignMatch,
} from '@racket-traits/api/match';

type Props = StackScreenProps<MatchParamList, 'Match'>;

const Match: React.FC<Props> = ({ navigation }) => {
  const { getSkill, isAdmin, isPlayer, isSingle, isFull, isPastDate } =
    useMatchFunctions();
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const { match: t } = useTranslation();
  const match = useMatch();
  const chats = useChats();
  const setChat = useSetChat();
  const deleteMatch = useDeleteMatch();
  const resignMatch = useResignMatch();
  const [share, onShare] = Hooks.useShare(matchShare(match.data, 'tennis'));
  const [matchChat, setMatchChat] = React.useState<Chat>();

  React.useEffect(() => {
    if (!match.hasLoaded) navigation.goBack();
  }, [match]);

  React.useEffect(() => {
    setMatchChat(chats.data.find((chat) => chat.id === match.data.chat?.id));
  }, [match.data, chats.data.length]);

  React.useEffect(() => {
    if (share.hasError)
      Native.Alert.alert('Something went wrong 😔', '', [
        { text: 'Cancel' },
        { text: 'Try again', onPress: () => onShare() },
      ]);
  }, [share.hasError]);

  return (
    <React.Fragment>
      <S.Scroll>
        <S.AvoidKeyboard>
          <S.Screen headerHeight={headerHeight}>
            <S.Padding size="xs" vertical={false} flexBox={true}>
              <S.Spacer size="xs" />

              <C.JoinMatchCard {...match.data} />

              <S.Spacer size="s" />

              <S.Padding size="xxs" vertical={false}>
                {!match.data.isPlayed && isPlayer(match.data.users) && (
                  <S.Container size="xs">
                    <S.Row justify="center">
                      <S.SmallButton
                        icon="chat"
                        label={t.chat}
                        disabled={!matchChat}
                        onPress={() => {
                          matchChat && setChat(matchChat);
                          navigation.navigate('Chat');
                        }}
                      />

                      <S.Spacer size="xs" />

                      <S.SmallButton
                        icon="community"
                        label={t.invite}
                        disabled={isFull(match.data)}
                        onPress={() => navigation.navigate('Invite')}
                      />

                      <S.Spacer size="xs" />

                      <S.SmallButton
                        color="g600"
                        background="g100"
                        icon="share"
                        label={t.share}
                        disabled={isFull(match.data)}
                        onPress={onShare}
                      />
                    </S.Row>
                  </S.Container>
                )}

                <S.Row align="center">
                  <S.Svg src="infoDrop" width="20px" color="g400" />
                  <S.Spacer size="xxs" />
                  <S.Body>{match.data.center?.address}</S.Body>
                </S.Row>

                <S.Spacer size="xs" />

                <S.Row align="center">
                  <S.Svg src="clock" width="20px" color="g400" />
                  <S.Spacer size="xxs" />
                  <S.Body>
                    {getTime(match.data.dateTime)}{' '}
                    {getWeekday(match.data.dateTime)}
                  </S.Body>
                  <S.Spacer size="xxs" />
                  <S.Svg src="calender" width="20px" color="g400" />
                  <S.Spacer size="xxs" />
                  <S.Body>{getDate(match.data.dateTime)}</S.Body>
                </S.Row>

                <S.Spacer size="xs" />

                <S.Row align="center">
                  <S.Svg src="star" width="18px" color="g400" />
                  <S.Spacer size="xxs" />
                  <S.Body>{getSkill(match.data.users)}</S.Body>
                </S.Row>

                <S.Spacer size="xs" />

                <S.Row align="end">
                  <S.Svg src="stopwatch" width="20px" color="g400" />
                  <S.Spacer size="xxs" />
                  <S.Body>{match.data.duration} min</S.Body>
                </S.Row>

                <S.Spacer size="xs" />
              </S.Padding>

              <S.Spacer size="s" />

              <S.Fill />

              {isPlayer(match.data.users) && (
                <React.Fragment>
                  {match.data.isBooked && !isAdmin(match.data.users) && (
                    <S.Button
                      icon="currency"
                      label={`${t.pay}  ${
                        Number(match.data.price) /
                        (isSingle(match.data) ? 2 : 4)
                      }/${match.data.currency}`}
                    />
                  )}
                </React.Fragment>
              )}

              <S.Spacer size="xs" />

              <S.Modal>
                {isPastDate(match.data) && isAdmin(match.data.users) && (
                  <S.ModalOpenButton>
                    <S.Button label={'Mark as played'} icon="cup" />
                  </S.ModalOpenButton>
                )}

                <S.ModalContents height="85%">
                  <S.Padding size="xs"></S.Padding>
                </S.ModalContents>
              </S.Modal>

              <S.Spacer size="xs" />

              <S.Modal>
                {isPlayer(match.data.users) && (
                  <S.ModalOpenButton>
                    <S.OutlineButton
                      color="g400"
                      label={
                        isAdmin(match.data.users)
                          ? t.abort_match
                          : t.leave_match
                      }
                    />
                  </S.ModalOpenButton>
                )}

                <S.ModalContents>
                  <S.Padding size="xs">
                    <S.ModalDismissButton
                      onPress={() =>
                        isAdmin(match.data.users)
                          ? deleteMatch(match.data)
                          : resignMatch(match.data)
                      }
                    >
                      <S.Button background="error" label={t.are_you_sure} />
                    </S.ModalDismissButton>
                  </S.Padding>
                </S.ModalContents>
              </S.Modal>

              {!match.data.isPublic && !isPlayer(match.data.users) && (
                <S.Button icon="lockOpen" label={'Ask to join'} />
              )}
            </S.Padding>
          </S.Screen>
        </S.AvoidKeyboard>
      </S.Scroll>

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Align type="center">
            <S.Absolute left="0">
              <S.Clickable onPress={() => navigation.goBack()}>
                <S.Svg src="leftArrow" width="20px" color="g1000" />
              </S.Clickable>
            </S.Absolute>

            <S.H5>{match.data.center?.name}</S.H5>
            <S.Detail color="g500">
              {match.data.users?.length}{' '}
              {match.data.users?.length === 1 ? t.member : t.members}
            </S.Detail>

            {isAdmin(match.data.users) && (
              <S.Absolute right="0">
                <S.Clickable onPress={() => navigation.navigate('UpdateMatch')}>
                  <S.Svg src="settings" width="20px" color="g1000" />
                </S.Clickable>
              </S.Absolute>
            )}
          </S.Align>
        </S.Padding>
      </S.Header>
    </React.Fragment>
  );
};

export default Match;

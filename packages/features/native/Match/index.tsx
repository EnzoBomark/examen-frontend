import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import { useMatchFunctions, useUnloadMatch } from '@racket-traits/api/match';
import { getTime, getDate, getWeekday } from '@racket-traits/misc';
import { useTranslation } from '@racket-traits/lang';

type Props = StackScreenProps<MatchParamList, 'Match'>;

const Match: React.FC<Props> = ({ navigation, route }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const { getSkill, isAdmin, isSingle } = useMatchFunctions();
  const { match: t } = useTranslation();
  const unloadMatch = useUnloadMatch();
  const match = route.params;

  return (
    <React.Fragment>
      <S.Scroll>
        <S.AvoidKeyboard>
          <S.Screen headerHeight={headerHeight}>
            <S.Padding size="xs" vertical={false} flexBox={true}>
              <S.Spacer size="xs" />

              <C.JoinMatchCard {...match} />

              <S.Spacer size="s" />

              <S.Padding size="xxs" vertical={false}>
                <S.Row>
                  <S.SmallButton icon="chat" label={t.chat} />
                  <S.Spacer size="xs" />
                  <S.SmallButton icon="community" label={t.invite} />
                  <S.Spacer size="xs" />
                  <S.SmallButton
                    color="g600"
                    background="g100"
                    icon="share"
                    label={t.share}
                  />
                </S.Row>

                <S.Spacer size="xs" />

                <S.Row align="center">
                  <S.Svg src="infoDrop" width="20px" color="g400" />
                  <S.Spacer size="xxs" />
                  <S.Body>{match.center?.address}</S.Body>
                </S.Row>

                <S.Spacer size="xs" />

                <S.Row align="center">
                  <S.Svg src="clock" width="20px" color="g400" />
                  <S.Spacer size="xxs" />
                  <S.Body>
                    {getTime(match.dateTime)} {getWeekday(match.dateTime)}
                  </S.Body>
                  <S.Spacer size="xxs" />
                  <S.Svg src="calender" width="20px" color="g400" />
                  <S.Spacer size="xxs" />
                  <S.Body>{getDate(match.dateTime)}</S.Body>
                </S.Row>

                <S.Spacer size="xs" />

                <S.Row align="center">
                  <S.Svg src="star" width="18px" color="g400" />
                  <S.Spacer size="xxs" />
                  <S.Body>{getSkill(match.users)}</S.Body>
                </S.Row>

                <S.Spacer size="xs" />

                <S.Row align="end">
                  <S.Svg src="stopwatch" width="20px" color="g400" />
                  <S.Spacer size="xxs" />
                  <S.Body>{match.duration} min</S.Body>
                </S.Row>

                <S.Spacer size="xs" />
              </S.Padding>

              <S.Spacer size="s" />

              <S.Fill />

              {match.isBooked && !isAdmin(match.users) && (
                <S.Button
                  icon="currency"
                  label={`${t.pay}  ${
                    Number(match.price) / (isSingle(match) ? 2 : 4)
                  }/${match.currency}`}
                />
              )}

              <S.Spacer size="xs" />

              <S.Modal>
                <S.ModalOpenButton>
                  <S.OutlineButton
                    color="g400"
                    label={isAdmin(match.users) ? t.abort_match : t.leave_match}
                  />
                </S.ModalOpenButton>

                <S.ModalContents>
                  <S.Padding size="xs">
                    <S.ModalDismissButton>
                      <S.Button background="error" label={t.are_you_sure} />
                    </S.ModalDismissButton>
                  </S.Padding>
                </S.ModalContents>
              </S.Modal>
            </S.Padding>
          </S.Screen>
        </S.AvoidKeyboard>
      </S.Scroll>

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Align type="center">
            <S.Absolute left="0">
              <S.Clickable
                onPress={() => {
                  unloadMatch();
                  navigation.navigate('Discover');
                }}
              >
                <S.Svg src="leftArrow" width="20px" color="g1000" />
              </S.Clickable>
            </S.Absolute>

            <S.H5>{match.center?.name}</S.H5>
            <S.Detail color="g500">
              {match.users?.length}{' '}
              {match.users?.length === 1 ? t.member : t.members}
            </S.Detail>
          </S.Align>
        </S.Padding>
      </S.Header>
    </React.Fragment>
  );
};

export default Match;

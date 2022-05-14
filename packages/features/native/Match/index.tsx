import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import { useMatch, useMatchFunctions } from '@racket-traits/api/match';
import { getTime, getDate, getWeekday } from '@racket-traits/utils';
import { useTranslation } from '@racket-traits/lang';

type Props = StackScreenProps<MatchParamList, 'Match'>;

const Match: React.FC<Props> = ({ navigation }) => {
  const { getSkill, isAdmin, isSingle } = useMatchFunctions();
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const { match: t } = useTranslation();
  const match = useMatch();

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
                <S.Row justify="center">
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

              {match.data.isBooked && !isAdmin(match.data.users) && (
                <S.Button
                  icon="currency"
                  label={`${t.pay}  ${
                    Number(match.data.price) / (isSingle(match.data) ? 2 : 4)
                  }/${match.data.currency}`}
                />
              )}

              <S.Spacer size="xs" />

              <S.Modal>
                <S.ModalOpenButton>
                  <S.OutlineButton
                    color="g400"
                    label={
                      isAdmin(match.data.users) ? t.abort_match : t.leave_match
                    }
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
              <S.Clickable onPress={() => navigation.navigate('Discover')}>
                <S.Svg src="leftArrow" width="20px" color="g1000" />
              </S.Clickable>
            </S.Absolute>

            <S.H5>{match.data.center?.name}</S.H5>
            <S.Detail color="g500">
              {match.data.users?.length}{' '}
              {match.data.users?.length === 1 ? t.member : t.members}
            </S.Detail>
          </S.Align>
        </S.Padding>
      </S.Header>
    </React.Fragment>
  );
};

export default Match;

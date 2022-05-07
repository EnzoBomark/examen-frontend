import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import { useMatchFunctions } from '@racket-traits/api/match';
import { getTime, getWeekday } from '@racket-traits/misc';

const Card = styled.View`
  width: 100%;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
`;

const Bottom = styled.View`
  width: 100%;
  border-bottom-left-radius: ${theme.radius.xs};
  border-bottom-right-radius: ${theme.radius.xs};
  background-color: ${theme.colors.g50};
`;

const CardSpacer = styled.View`
  width: 11px;
  height: 11px;
`;

type Navigation = StackNavigationProp<MatchParamList, 'Discover'>;

export const MatchCard: React.FC<Match> = (match) => {
  const navigation = useNavigation<Navigation>();
  const { getSkill, isSingle, getAdmin, getUser } = useMatchFunctions();

  return (
    <S.Clickable onPress={() => navigation.navigate('Match', match)}>
      <Card style={{ ...theme.shadow }}>
        <S.Row justify="between">
          <S.Padding size="xs" flexBox={true}>
            <S.Body bold={true} color="p600" numberOfLines={2}>
              {match.center?.name}
            </S.Body>

            <S.Spacer size="xxs" />

            <S.Body>
              {getTime(match.dateTime)} {getWeekday(match.dateTime)}
            </S.Body>

            <S.Spacer size="xxs" />

            <S.Detail color="g500">{getAdmin(match.users)?.name}</S.Detail>

            <S.Spacer size="xs" />

            <S.Row align="end">
              <S.Svg src="star" color="s500" width="18px" />

              <S.Spacer size="xxs" />

              <S.Body>{getSkill(match.users)}</S.Body>
            </S.Row>
          </S.Padding>

          <S.Padding size="xs">
            <S.Row>
              <S.Image
                src={getUser(match.users, '0')?.picture || ''}
                width="45px"
              />
              <CardSpacer />
              <S.Image
                src={getUser(match.users, '1')?.picture || ''}
                width="45px"
              />
            </S.Row>
            <CardSpacer />
            <S.Row>
              <S.Image
                src={getUser(match.users, '2')?.picture || ''}
                width="45px"
              />
              <CardSpacer />
              <S.Image
                src={getUser(match.users, '3')?.picture || ''}
                width="45px"
              />
            </S.Row>
          </S.Padding>
        </S.Row>

        {match.isBooked && (
          <Bottom>
            <S.UnderLine />
            <S.Padding size="xs">
              <S.Row justify="between">
                <S.Detail bold={true}>Court ({match.court}) booked</S.Detail>
                <S.Detail>
                  {Number(match.price) / (isSingle(match) ? 2 : 4)}{' '}
                  {match.currency?.toLowerCase()}/person
                </S.Detail>
              </S.Row>
            </S.Padding>
          </Bottom>
        )}
      </Card>
    </S.Clickable>
  );
};

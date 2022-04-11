import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';

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

export const MatchCard: React.FC<Match> = (props) => {
  const navigation = useNavigation<Navigation>();
  const users = props.users!;
  const center = props.center?.name;
  const time = props.dateTime;
  const admin = users.find((user) => user.usersMatches?.isAdmin)!;
  const userOne = users.find((user) => user.usersMatches?.position === '0');
  const userTwo = users.find((user) => user.usersMatches?.position === '1');
  const userThree = users.find((user) => user.usersMatches?.position === '2');
  const userFour = users.find((user) => user.usersMatches?.position === '3');
  const rank = users.map((user) => Number(user.skill)) || [];

  return (
    <S.Clickable onPress={() => navigation.navigate('Match', props)}>
      <Card style={{ ...theme.shadow }}>
        <S.Row justify="between">
          <S.Padding size="xs" style={{ flex: 1 }}>
            <S.Body bold={true} color="p600" numberOfLines={2}>
              {center}
            </S.Body>

            <S.Spacer size="xxs" />

            <S.Body>{time}</S.Body>

            <S.Spacer size="xxs" />

            <S.Detail color="g500">{admin.name}</S.Detail>

            <S.Spacer size="xs" />

            <S.Row align="end">
              <S.Svg src="star" color="s500" width="18px" />

              <S.Spacer size="xxs" />

              <S.Body>
                {users.length <= 1
                  ? `Rank  ${rank[0]}`
                  : `Rank  ${Math.min(...rank)} - ${Math.max(...rank)}`}
              </S.Body>
            </S.Row>
          </S.Padding>

          <S.Padding size="xs">
            <S.Row>
              <S.Image src={userOne?.picture || ''} width="45px" />
              <CardSpacer />
              <S.Image src={userTwo?.picture || ''} width="45px" />
            </S.Row>
            <CardSpacer />
            <S.Row>
              <S.Image src={userThree?.picture || ''} width="45px" />
              <CardSpacer />
              <S.Image src={userFour?.picture || ''} width="45px" />
            </S.Row>
          </S.Padding>
        </S.Row>

        {props.isBooked && (
          <Bottom>
            <S.UnderLine />
            <S.Padding size="xs">
              <S.Row justify="between">
                <S.Detail bold={true}>Court ({props.court}) booked</S.Detail>
                <S.Detail>
                  {Number(props.price) / (props.type === 'single' ? 2 : 4)}{' '}
                  {props.currency?.toLowerCase()}/person
                </S.Detail>
              </S.Row>
            </S.Padding>
          </Bottom>
        )}
      </Card>
    </S.Clickable>
  );
};

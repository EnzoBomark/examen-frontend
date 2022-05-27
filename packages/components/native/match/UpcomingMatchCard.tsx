import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import { getTime, getWeekday } from '@racket-traits/utils';
import {
  useMatchFunctions,
  useSetMatch,
  useUnloadMatch,
} from '@racket-traits/api/match';

const Card = styled.View`
  height: 105px;
  width: 185px;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
`;

type Navigation = StackNavigationProp<MatchParamList, 'Discover'>;

export const UpcomingMatchCard: React.FC<Match> = (match) => {
  const navigation = useNavigation<Navigation>();
  const setMatch = useSetMatch();
  const unloadMatch = useUnloadMatch();
  const { getSkill, isSingle, getAdmin, getUser } = useMatchFunctions();
  return (
    <S.Clickable
      onPress={() => {
        unloadMatch();
        setMatch(match);
        navigation.navigate('Match');
      }}
    >
      <Card style={{ ...theme.shadow }}>
        <S.Padding size="xs">
          <S.Body bold={true} color="p600">
            {match.center?.name}
          </S.Body>

          <S.Tiny color="g600">
            {getTime(match.dateTime)} {getWeekday(match.dateTime)}
          </S.Tiny>

          <S.Spacer size="xs" />

          {isSingle(match) ? (
            <React.Fragment>
              <React.Fragment>
                <S.Row justify="between">
                  <S.ProfilePicture
                    border="xxs"
                    user={getUser(match.users, '0')}
                    width="26px"
                    icon={match.isPublic ? 'add' : 'lock'}
                  />

                  <S.Spacer size="m" />

                  <S.ProfilePicture
                    border="xxs"
                    user={getUser(match.users, '1')}
                    width="26px"
                    icon={match.isPublic ? 'add' : 'lock'}
                  />
                </S.Row>
              </React.Fragment>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <S.Row justify="between">
                <S.Row>
                  <S.ProfilePicture
                    border="xxs"
                    user={getUser(match.users, '0')}
                    width="26px"
                    icon={match.isPublic ? 'add' : 'lock'}
                  />

                  <S.Spacer size="xxxs" />

                  <S.ProfilePicture
                    border="xxs"
                    user={getUser(match.users, '1')}
                    width="26px"
                    icon={match.isPublic ? 'add' : 'lock'}
                  />
                </S.Row>

                <S.Row>
                  <S.ProfilePicture
                    border="xxs"
                    user={getUser(match.users, '2')}
                    width="26px"
                    icon={match.isPublic ? 'add' : 'lock'}
                  />

                  <S.Spacer size="xxxs" />

                  <S.ProfilePicture
                    border="xxs"
                    user={getUser(match.users, '3')}
                    width="26px"
                    icon={match.isPublic ? 'add' : 'lock'}
                  />
                </S.Row>
              </S.Row>
            </React.Fragment>
          )}
        </S.Padding>
      </Card>
    </S.Clickable>
  );
};

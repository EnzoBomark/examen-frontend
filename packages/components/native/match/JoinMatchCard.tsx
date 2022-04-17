import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import { useProfile, useSetProfile } from '@racket-traits/api/profile';

const Card = styled.View`
  position: relative;
  width: 100%;
  min-height: 250px;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
`;

const Inner = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const CourtSide = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const PlayerCard = styled.View<Justify>`
  height: 100%;
  padding: 20% 5px;
  justify-content: ${({ type }) => theme.justify[type]};
  align-items: center;
`;

const Bottom = styled.View`
  width: 100%;
  border-bottom-left-radius: ${theme.radius.xs};
  border-bottom-right-radius: ${theme.radius.xs};
  background-color: ${theme.colors.g50};
`;

const Divider = styled.View`
  height: 100%;
  width: 1px;
  background-color: ${theme.colors.g100};
`;

const NameTag = styled(S.Detail)`
  max-width: 54px;
  color: ${theme.colors.g500};
`;

type Navigation = StackNavigationProp<MatchParamList, 'Discover'>;

export const JoinMatchCard: React.FC<Match> = (match) => {
  const navigation = useNavigation<Navigation>();
  const profile = useProfile();
  const users = match.users;
  const center = match.center?.name;
  const time = match.dateTime;
  const admin = users?.find((user) => user.usersMatches?.isAdmin);
  const userOne = users?.find((user) => user.usersMatches?.position === '0');
  const userTwo = users?.find((user) => user.usersMatches?.position === '1');
  const userThree = users?.find((user) => user.usersMatches?.position === '2');
  const userFour = users?.find((user) => user.usersMatches?.position === '3');
  const rank = users?.map((user) => Number(user.skill)) || [];

  const isMe = (user?: User) => user?.id === profile.data.id;
  const isPlayer = users?.some((user) => user.id === profile.data.id);
  const isAdmin = admin?.id === profile.data.id;
  const isSingle = match.type === 'single';

  const Player: React.FC<Align & { user?: User }> = ({ user, type }) => (
    <PlayerCard type={type}>
      {user && <NameTag numberOfLines={1}>{user.name}</NameTag>}
      <S.Spacer size="xxs" />
      {user ? (
        <S.Image src={user?.picture || ''} width="54px" />
      ) : (
        <S.IconButton
          disabled={isPlayer}
          icon={match.isPublic ? 'plus' : 'lock'}
        />
      )}
      <S.Spacer size="xxs" />
      {isAdmin ||
        (isMe(user) && (
          <S.Clickable>
            <S.Svg src="exit" width="20px" color="g300" />
          </S.Clickable>
        ))}
    </PlayerCard>
  );

  return (
    <Card style={theme.shadow}>
      <Inner>
        <CourtSide>
          {isSingle ? (
            <Player type="center" user={userOne} />
          ) : (
            <React.Fragment>
              <Player type="start" user={userOne} />
              <Player type="end" user={userTwo} />
            </React.Fragment>
          )}
        </CourtSide>
        <Divider />
        <CourtSide>
          {isSingle ? (
            <Player type="center" user={userTwo} />
          ) : (
            <React.Fragment>
              <Player type="end" user={userThree} />
              <Player type="start" user={userFour} />
            </React.Fragment>
          )}
        </CourtSide>
      </Inner>

      <S.Fill />
      <S.UnderLine />
      <Bottom>
        <S.Padding size="xs">
          <S.H5 color="g600">Bio</S.H5>
          <S.Spacer size="xxs" />
          <S.Body color="g500">Add bio</S.Body>
        </S.Padding>
      </Bottom>
    </Card>
  );
};

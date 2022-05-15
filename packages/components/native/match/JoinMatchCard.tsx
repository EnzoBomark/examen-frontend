import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { useProfile } from '@racket-traits/api/profile';
import { useMatchFunctions, useResignMatch } from '@racket-traits/api/match';

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

export const JoinMatchCard: React.FC<Match> = (match) => {
  const { isAdmin, isPlayer, isSingle, isMe, getUser } = useMatchFunctions();
  const resignMatch = useResignMatch();
  const userOne = getUser(match.users, '0');
  const userTwo = getUser(match.users, '1');
  const userThree = getUser(match.users, '2');
  const userFour = getUser(match.users, '3');

  const Player: React.FC<
    Align & { user?: User; position: '0' | '1' | '2' | '3' }
  > = ({ user, type, position }) => (
    <PlayerCard type={type}>
      {user && <NameTag numberOfLines={1}>{user.name}</NameTag>}
      <S.Spacer size="xxs" />
      {user ? (
        <S.ProfilePicture user={user} width="54px" />
      ) : (
        <S.IconButton
          disabled={isPlayer(match.users)}
          icon={match.isPublic ? 'add' : 'lock'}
          onPress={() => match.isPublic && resignMatch(match, position)}
        />
      )}
      <S.Spacer size="xxs" />
      {!isMe(user) && isAdmin(match.users) && user && (
        <S.Clickable>
          <S.Svg src="exit" width="20px" color="g300" />
        </S.Clickable>
      )}
    </PlayerCard>
  );

  return (
    <Card style={theme.shadow}>
      <Inner>
        <CourtSide>
          {isSingle(match) ? (
            <Player type="center" user={userOne} position="0" />
          ) : (
            <React.Fragment>
              <Player type="start" user={userOne} position="0" />
              <Player type="end" user={userTwo} position="1" />
            </React.Fragment>
          )}
        </CourtSide>
        <Divider />
        <CourtSide>
          {isSingle(match) ? (
            <Player type="center" user={userTwo} position="1" />
          ) : (
            <React.Fragment>
              <Player type="end" user={userThree} position="2" />
              <Player type="start" user={userFour} position="3" />
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

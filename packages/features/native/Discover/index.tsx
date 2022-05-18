import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import * as Hooks from '@racket-traits/hooks';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import { useProfile } from '@racket-traits/api/profile';
import {
  useFetchMatches,
  useMatches,
  useMatchFunctions,
  useRefreshMatches,
  useUnloadMatch,
} from '@racket-traits/api/match';
import { useFocusEffect } from '@react-navigation/native';

type Props = DrawerScreenProps<MatchParamList, 'Discover'>;

const dummy = [
  { center: 'Lund Padelcenter', dateTime: '2022-04-05' },
  { center: 'Tyresö Padelcenter', dateTime: '2022-04-06' },
  { center: 'Stockholm Tennis', dateTime: '2022-04-07' },
  { center: 'Stockholm Tennis', dateTime: '2022-04-07' },
];

const Discover: React.FC<Props> = ({ navigation }) => {
  const { sortMatches } = useMatchFunctions();
  const profile = useProfile();
  const matches = useMatches();
  const unloadMatch = useUnloadMatch();
  const fetchMatches = useFetchMatches();
  const refreshMatches = useRefreshMatches();
  const [accordion, setAccordion] = React.useState(false);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const showLoadingBar = Hooks.useDelay(matches.isLoading, 2100);

  useFocusEffect(
    React.useCallback(() => {
      refreshMatches();
    }, [])
  );

  return (
    <React.Fragment>
      {!!sortMatches(matches.data).length ? (
        <S.List
          fullScreen
          data={sortMatches(matches.data)}
          onRefresh={refreshMatches}
          headerHeight={headerHeight}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <C.MatchCard {...item} />}
          onEndReached={() => matches.hasMore && fetchMatches(matches.page)}
        />
      ) : (
        <C.EmptyListReload
          title="Oh no!"
          message="No matches found"
          onPress={refreshMatches}
          headerHeight={headerHeight}
        />
      )}

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs" vertical={false}>
          <S.Spacer size="xs" />

          <S.Row align="center">
            <S.Clickable onPress={() => navigation.openDrawer()}>
              <S.Svg src="hamburger" width="24px" color="g1000" />
            </S.Clickable>

            <S.Fill />

            <S.Clickable
              onPress={() => {
                unloadMatch();
                navigation.navigate('CreateMatch');
              }}
            >
              <S.Svg src="add" width="24px" color="g1000" />
            </S.Clickable>

            <S.Spacer size="xs" />

            <S.Clickable onPress={() => navigation.navigate('ProfileStack')}>
              <S.ProfilePicture user={profile.data} width="44px" />
            </S.Clickable>
          </S.Row>

          <S.Spacer size="xs" />

          <S.TextInput placeholder="Search" height="38px" icon="search" />

          <S.Spacer size="xs" />

          <S.Row align="center">
            <S.Spacer size="xxs" />

            <S.Clickable onPress={() => setAccordion((prev) => !prev)}>
              <S.Row align="center">
                <S.Svg
                  src={accordion ? 'upArrow' : 'downArrow'}
                  width="10px"
                  color="g1000"
                />
                <S.Spacer size="xxs" />
                <S.H5 color="g1000" bold={true}>
                  {accordion ? 'Upcoming Matches' : 'Show Upcoming Matches'}
                </S.H5>
              </S.Row>
            </S.Clickable>

            <S.Fill />

            <S.Clickable>
              <S.Body color="p600">See All</S.Body>
            </S.Clickable>

            <S.Spacer size="xs" />
          </S.Row>
        </S.Padding>
        {accordion ? (
          <S.HorizontalList
            data={dummy}
            renderItem={({ item }) => <C.UpcomingMatchCard {...item} />}
          />
        ) : (
          <S.Spacer size="xs" />
        )}

        {showLoadingBar && <S.LoadingBar />}
      </S.Header>
    </React.Fragment>
  );
};

export default Discover;

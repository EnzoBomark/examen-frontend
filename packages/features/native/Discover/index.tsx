import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { useFocusEffect } from '@react-navigation/native';
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
import {
  useRefreshUpcoming,
  useUpcoming,
} from '@racket-traits/api/user/misc/upcoming';

type Props = DrawerScreenProps<MatchParamList, 'Discover'>;

const Discover: React.FC<Props> = ({ navigation }) => {
  const { sortMatches } = useMatchFunctions();
  const profile = useProfile();
  const matches = useMatches();
  const upcoming = useUpcoming();
  const unloadMatch = useUnloadMatch();
  const fetchMatches = useFetchMatches();
  const refreshMatches = useRefreshMatches();
  const refreshUpcoming = useRefreshUpcoming();
  const [accordion, setAccordion] = React.useState(false);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [query, setQuery] = React.useState('');

  useFocusEffect(
    React.useCallback(() => {
      refreshMatches(query);
      refreshUpcoming(query, profile.data);
    }, [])
  );

  React.useEffect(() => {
    if (matches.hasLoaded) refreshMatches(query);
  }, [query]);

  const emptyList = (
    <C.EmptyListReload
      title="Oh no!"
      message={query.length ? 'No search result found' : 'No matches found'}
      onPress={() => refreshMatches(query)}
      headerHeight={headerHeight}
      loading={matches.isLoading}
    />
  );

  return (
    <React.Fragment>
      <S.List
        fullScreen
        data={sortMatches(matches.data)}
        ListEmptyComponent={emptyList}
        onRefresh={() => refreshMatches(query)}
        headerHeight={headerHeight}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <C.MatchCard {...item} />}
        onEndReached={() =>
          matches.hasMore && fetchMatches(query, matches.page)
        }
      />

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

          <S.TextInput
            placeholder="Search"
            height="38px"
            icon="search"
            value={query}
            onTextChange={setQuery}
          />

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

            <S.Clickable onPress={() => navigation.navigate('UpcomingMatches')}>
              <S.Body color="p600">See All</S.Body>
            </S.Clickable>

            <S.Spacer size="xs" />
          </S.Row>
        </S.Padding>
        {accordion ? (
          <S.HorizontalList
            data={upcoming.data}
            renderItem={({ item }) => <C.UpcomingMatchCard {...item} />}
          />
        ) : (
          <S.Spacer size="xs" />
        )}

        {matches.isLoading && <S.LoadingBar />}
      </S.Header>
    </React.Fragment>
  );
};

export default Discover;

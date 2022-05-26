import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import { useProfile } from '@racket-traits/api/profile';
import {
  useFetchUpcoming,
  useRefreshUpcoming,
  useUpcoming,
} from '@racket-traits/api/user/misc/upcoming';

type Props = DrawerScreenProps<MatchParamList, 'UpcomingMatches'>;

const UpcomingMatches: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const profile = useProfile();
  const upcoming = useUpcoming();
  const fetchUpcoming = useFetchUpcoming();
  const refreshUpcoming = useRefreshUpcoming();
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (upcoming.hasLoaded) refreshUpcoming(query, profile.data);
  }, [query]);

  const emptyList = (
    <C.EmptyListReload
      title="Oh no!"
      message={
        query.length
          ? 'No search result found'
          : "Looks like you don't have any upcoming matches"
      }
      onPress={() => refreshUpcoming(query, profile.data)}
      headerHeight={headerHeight}
      loading={upcoming.isLoading}
    />
  );

  return (
    <React.Fragment>
      <S.List
        fullScreen
        data={upcoming.data}
        ListEmptyComponent={emptyList}
        onRefresh={() => refreshUpcoming(query, profile.data)}
        headerHeight={headerHeight}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <C.MatchCard {...item} />}
        onEndReached={() =>
          upcoming.hasMore && fetchUpcoming(query, profile.data, upcoming.page)
        }
      />

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs" vertical={false}>
          <S.Spacer size="xs" />

          <S.Row justify="center">
            <S.Absolute left="0" bottom="0">
              <S.Clickable onPress={() => navigation.goBack()}>
                <S.Svg src="leftArrow" color="g1000" width="20px" />
              </S.Clickable>
            </S.Absolute>

            <S.H5 bold>Upcoming matches</S.H5>
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
        </S.Padding>

        {upcoming.isLoading && <S.LoadingBar />}
      </S.Header>
    </React.Fragment>
  );
};

export default UpcomingMatches;

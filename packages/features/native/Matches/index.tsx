import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import {
  useFetchMatches,
  useMatches,
  useMatchFunctions,
  useRefreshMatches,
} from '@racket-traits/api/match';

type Props = DrawerScreenProps<MatchParamList, 'MatchHistory'>;

const Matches: React.FC<Props> = ({ navigation }) => {
  const { sortMatches } = useMatchFunctions();
  const matches = useMatches();
  const fetchMatches = useFetchMatches();
  const refreshMatches = useRefreshMatches();
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [query, setQuery] = React.useState('');

  const emptyList = (
    <C.EmptyListReload
      title="Oh no!"
      message="Looks like you don't have any played matches"
      onPress={() => refreshMatches(query)}
      headerHeight={headerHeight}
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

          <S.Row justify="center">
            <S.Absolute left="0" bottom="0">
              <S.Clickable onPress={() => navigation.goBack()}>
                <S.Svg src="leftArrow" color="g1000" width="20px" />
              </S.Clickable>
            </S.Absolute>

            <S.H5 bold>Your matches</S.H5>
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

        {matches.isLoading && <S.LoadingBar />}
      </S.Header>
    </React.Fragment>
  );
};

export default Matches;

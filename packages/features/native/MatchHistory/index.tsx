import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import {
  useFetchHistory,
  useHistory,
  useRefreshHistory,
} from '@racket-traits/api/user/misc/history';
import { useProfile } from '@racket-traits/api/profile';

type Props = DrawerScreenProps<MatchParamList, 'MatchHistory'>;

const MatchHistory: React.FC<Props> = ({ navigation }) => {
  const profile = useProfile();
  const history = useHistory();
  const fetchHistory = useFetchHistory();
  const refreshHistory = useRefreshHistory();
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (!history.hasLoaded) fetchHistory(query, profile.data, history.page);
  }, []);

  const emptyList = (
    <C.EmptyListReload
      title="Oh no!"
      message={
        query.length
          ? 'No search result found'
          : "Looks like you don't have any played matches"
      }
      onPress={() => refreshHistory(query, profile.data)}
      headerHeight={headerHeight}
      loading={history.isLoading}
    />
  );

  return (
    <React.Fragment>
      <S.List
        fullScreen
        data={history.data}
        ListEmptyComponent={emptyList}
        onRefresh={() => refreshHistory(query, profile.data)}
        headerHeight={headerHeight}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <C.MatchCard {...item} />}
        onEndReached={() =>
          history.hasMore && fetchHistory(query, profile.data, history.page)
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

            <S.H5 bold>Match history</S.H5>
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

        {history.isLoading && <S.LoadingBar />}
      </S.Header>
    </React.Fragment>
  );
};

export default MatchHistory;

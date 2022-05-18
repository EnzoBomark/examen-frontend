import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import * as Hooks from '@racket-traits/hooks';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import { useMatchFunctions } from '@racket-traits/api/match';
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
  const showLoadingBar = Hooks.useDelay(history.isLoading, 1000);

  React.useEffect(() => {
    if (!history.hasLoaded) fetchHistory(profile.data, history.page);
  }, []);

  return (
    <React.Fragment>
      {!!history.data.length ? (
        <S.List
          fullScreen
          data={history.data}
          onRefresh={() => refreshHistory(profile.data)}
          headerHeight={headerHeight}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <C.MatchCard {...item} />}
          onEndReached={() =>
            history.hasMore && fetchHistory(profile.data, history.page)
          }
        />
      ) : (
        <C.EmptyListReload
          title="Oh no!"
          message="Looks like you don't have any played matches"
          onPress={() => refreshHistory(profile.data)}
          headerHeight={headerHeight}
        />
      )}

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

          <S.TextInput placeholder="Search" height="38px" icon="search" />

          <S.Spacer size="xs" />
        </S.Padding>

        {showLoadingBar && <S.LoadingBar />}
      </S.Header>
    </React.Fragment>
  );
};

export default MatchHistory;

import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import * as Hooks from '@racket-traits/hooks';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import {
  useFetchUpcoming,
  useRefreshUpcoming,
  useUpcoming,
} from '@racket-traits/api/user/misc/upcoming';
import { useProfile } from '@racket-traits/api/profile';

type Props = DrawerScreenProps<MatchParamList, 'UpcomingMatches'>;

const UpcomingMatches: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const profile = useProfile();
  const upcoming = useUpcoming();
  const fetchUpcoming = useFetchUpcoming();
  const refreshUpcoming = useRefreshUpcoming();
  const showLoadingBar = Hooks.useDelay(upcoming.isLoading, 1000);

  return (
    <React.Fragment>
      {!!upcoming.data.length ? (
        <S.List
          fullScreen
          data={upcoming.data}
          onRefresh={() => refreshUpcoming(profile.data)}
          headerHeight={headerHeight}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <C.MatchCard {...item} />}
          onEndReached={() =>
            upcoming.hasMore && fetchUpcoming(profile.data, upcoming.page)
          }
        />
      ) : (
        <C.EmptyListReload
          title="Oh no!"
          message="Looks like you don't have any upcoming matches"
          onPress={() => refreshUpcoming(profile.data)}
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

            <S.H5 bold>Upcoming matches</S.H5>
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

export default UpcomingMatches;

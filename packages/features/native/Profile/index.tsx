import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ProfileParamList } from '@racket-native/router/stacks/ProfileStack';
import { useProfile } from '@racket-traits/api/profile';
import {
  useHistory,
  useCountHistory,
} from '@racket-traits/api/user/misc/history';
import {
  useUpcoming,
  useCountUpcoming,
} from '@racket-traits/api/user/misc/upcoming';
import {
  useFollowers,
  useCountFollowers,
} from '@racket-traits/api/user/misc/followers';
import {
  useFollowings,
  useCountFollowings,
} from '@racket-traits/api/user/misc/followings';
import {
  useCenters,
  useCountCenters,
} from '@racket-traits/api/user/misc/centers';
import {
  useFetchWinRate,
  useWinRate,
} from '@racket-traits/api/user/misc/win-rate';

type Props = DrawerScreenProps<ProfileParamList, 'Profile'>;

const Profile: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [showSettings, setShowSetting] = React.useState(false);
  const profile = useProfile();
  const winRate = useWinRate();
  const fetchWinRate = useFetchWinRate();
  const countCenters = useCountCenters();
  const countHistory = useCountHistory();
  const countUpcoming = useCountUpcoming();
  const countFollowers = useCountFollowers();
  const countFollowings = useCountFollowings();
  const centers = useCenters();
  const history = useHistory();
  const upcoming = useUpcoming();
  const followers = useFollowers();
  const followings = useFollowings();

  useFocusEffect(
    React.useCallback(() => {
      fetchWinRate(profile.data);
      countCenters(profile.data);
      countHistory(profile.data);
      countUpcoming(profile.data);
      countFollowers(profile.data);
      countFollowings(profile.data);
    }, [])
  );

  return (
    <React.Fragment>
      <S.Scroll>
        <S.AvoidKeyboard>
          <S.Screen headerHeight={headerHeight}>
            <S.Padding size="xs" vertical={false} flexBox={true}>
              <S.Spacer size="xs" />

              <C.ProfileCard {...profile.data} />

              <S.Spacer size="s" />

              <S.ToggleButton
                labelOne="Stats"
                labelTwo="Settings"
                toggle={setShowSetting}
                value={showSettings}
              />

              <S.Spacer size="s" />

              {!showSettings && (
                <React.Fragment>
                  <C.ProfileBioCard {...profile.data} />

                  <S.Spacer size="s" />

                  <S.Wrap>
                    <C.ProfileStatsCard
                      header={winRate.data ? `${winRate.data}%` : '-'}
                      detail={'Win rate'}
                    />

                    <C.ProfileStatsCard
                      header={upcoming.count.toString()}
                      detail={'Upcoming matches'}
                      onPress={() => navigation.navigate('UpcomingMatches')}
                    />

                    <C.ProfileStatsCard
                      header={history.count.toString()}
                      detail={'Matches played'}
                      onPress={() => navigation.navigate('MatchHistory')}
                    />

                    <C.ProfileStatsCard
                      header={centers.count.toString()}
                      detail={'Bookmarked centers'}
                      onPress={() => navigation.navigate('Centers')}
                    />

                    <C.ProfileStatsCard
                      header={followings.count.toString()}
                      detail={'Following'}
                    />

                    <C.ProfileStatsCard
                      header={followers.count.toString()}
                      detail={'Followers'}
                    />
                  </S.Wrap>
                </React.Fragment>
              )}

              {showSettings && (
                <React.Fragment>
                  <C.ProfileSettingsCard />
                </React.Fragment>
              )}

              <S.Spacer size="s" />
            </S.Padding>
          </S.Screen>
        </S.AvoidKeyboard>
      </S.Scroll>

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Row justify="between">
            <S.Clickable onPress={() => navigation.openDrawer()}>
              <S.Svg src="hamburger" width="24px" color="g1000" />
            </S.Clickable>
          </S.Row>
        </S.Padding>
      </S.Header>
    </React.Fragment>
  );
};

export default Profile;

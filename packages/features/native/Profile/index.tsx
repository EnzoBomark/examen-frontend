import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ProfileParamList } from '@racket-native/router/stacks/ProfileStack';
import { useProfile } from '@racket-traits/api/profile';

type Props = DrawerScreenProps<ProfileParamList, 'Profile'>;

const Profile: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [showSettings, setShowSetting] = React.useState(false);
  const profile = useProfile();

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
                      header={'17'}
                      detail={'Matches played'}
                    />

                    <C.ProfileStatsCard header={'92%'} detail={'Win rate'} />
                    <C.ProfileStatsCard header={'24'} detail={'Friends'} />
                    <C.ProfileStatsCard
                      header={'3'}
                      detail={'Upcoming matches'}
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

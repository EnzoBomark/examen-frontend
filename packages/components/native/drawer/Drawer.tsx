import * as React from 'react';
import * as Native from 'react-native';
import * as S from '@racket-styles/native';
import * as Hooks from '@racket-traits/hooks';
import * as Navigation from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import theme from '@racket-styles/core/theme';
import Images from '@racket-styles/assets/images';
import { appShare } from '@racket-traits/misc';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProfile } from '@racket-traits/api/profile';
import {
  useCountHistory,
  useHistory,
} from '@racket-traits/api/user/misc/history';

type Props = Navigation.DrawerContentComponentProps;

export const Drawer: React.FC<Props> = (props) => {
  const countHistory = useCountHistory();
  const profile = useProfile();
  const history = useHistory();
  const insets = useSafeAreaInsets();
  const [share, onShare] = Hooks.useShare(appShare());

  React.useEffect(() => {
    countHistory(profile.data);
  }, []);

  React.useEffect(() => {
    if (share.hasError)
      Native.Alert.alert('Something went wrong 😔', '', [
        { text: 'Cancel' },
        { text: 'Try again', onPress: () => onShare() },
      ]);
  }, [share.hasError]);

  return (
    <Native.View style={{ flex: 1 }}>
      <Navigation.DrawerContentScrollView
        {...props}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          height: '100%',

          backgroundColor: theme.colors.p800,
        }}
      >
        <S.ImageBackground source={Images.drawer}>
          <S.Padding size="xxs">
            <S.ProfilePicture user={profile.data} width="80px" border="s" />

            <S.Spacer size="xs" />

            <S.Padding size="xxxs" vertical={false}>
              <S.H3 color="g0">{profile.data.name}</S.H3>

              <S.Spacer size="xxs" />

              <S.Row>
                <S.Svg src="star" width="14px" />

                <S.Spacer size="xxxs" />

                <S.Body color="g0">{history.count} Played matches</S.Body>
              </S.Row>
            </S.Padding>
          </S.Padding>
        </S.ImageBackground>

        <Native.ScrollView
          style={{ flex: 1, backgroundColor: theme.colors.g0 }}
        >
          <S.Spacer size="xs" />

          <Navigation.DrawerItemList {...props} />

          <S.Spacer size="xs" />
        </Native.ScrollView>
      </Navigation.DrawerContentScrollView>

      <Native.View style={{ paddingBottom: insets.bottom }}>
        <S.UnderLine />

        <S.Padding size="s">
          <S.Clickable onPress={onShare}>
            <S.Row>
              <S.Svg src="share" width="18px" color="g1000" />

              <S.Spacer size="xxs" />

              <S.Body color="g1000">Share with friends</S.Body>
            </S.Row>

            <S.Spacer size="s" />
          </S.Clickable>

          <S.Clickable onPress={() => auth().signOut()}>
            <S.Row>
              <S.Svg src="sad" width="18px" color="g1000" />

              <S.Spacer size="xxs" />

              <S.Body color="g1000">Logout</S.Body>
            </S.Row>
          </S.Clickable>
        </S.Padding>
      </Native.View>
    </Native.View>
  );
};

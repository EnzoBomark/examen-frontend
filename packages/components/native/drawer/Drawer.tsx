import * as React from 'react';
import * as Native from 'react-native';
import * as S from '@racket-styles/native';
import * as Navigation from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import theme from '@racket-styles/core/theme';
import Images from '@racket-styles/assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProfile } from '@racket-traits/api/profile';

type Props = Navigation.DrawerContentComponentProps;

export const Drawer: React.FC<Props> = (props) => {
  const profile = useProfile();
  const insets = useSafeAreaInsets();

  return (
    <Native.View style={{ flex: 1 }}>
      <Navigation.DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: theme.colors.p800,
        }}
      >
        <S.ImageBackground source={Images.drawer}>
          <S.Padding size="xs">
            <S.Image src="TEST" width="80px" border="xxl" />

            <S.Spacer size="xxs" />

            <S.H3 color="g0">{profile.data.name}</S.H3>

            <S.Spacer size="xxs" />

            <S.Row>
              <S.Svg src="star" width="14px" />

              <S.Spacer size="xxs" />

              <S.Body color="g0">420 Matches</S.Body>
            </S.Row>
          </S.Padding>
        </S.ImageBackground>

        <Native.View style={{ flex: 1, backgroundColor: theme.colors.g0 }}>
          <S.Spacer size="xs" />

          <Navigation.DrawerItemList {...props} />

          <S.Spacer size="xs" />
        </Native.View>
      </Navigation.DrawerContentScrollView>

      <Native.View style={{ paddingBottom: insets.bottom }}>
        <S.UnderLine />

        <S.Padding size="s">
          <S.Clickable>
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

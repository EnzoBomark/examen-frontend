import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ProfileParamList } from '@racket-native/router/stacks/ProfileStack';
import { useCenter } from '@racket-traits/api/center';
import { useCenterFunctions } from '@racket-traits/api/center/useCenterFunctions';

type Props = DrawerScreenProps<ProfileParamList, 'Centers'>;

const Center: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const center = useCenter();

  return (
    <React.Fragment>
      <S.Scroll>
        <S.Screen headerHeight={headerHeight}>
          <S.Padding size="xs">
            <S.Center>
              <C.CenterInfo {...center.data} />
            </S.Center>
          </S.Padding>
        </S.Screen>
      </S.Scroll>

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Row>
            <S.Clickable onPress={() => navigation.goBack()}>
              <S.Svg src="leftArrow" color="g1000" width="20px" />
            </S.Clickable>

            <S.Fill />

            <S.Clickable onPress={() => null}>
              <S.Svg
                src={true ? 'bookmarkFill' : 'bookmark'}
                color={true ? 's600' : 'g400'}
                width="26px"
              />
            </S.Clickable>
          </S.Row>
        </S.Padding>
      </S.Header>
    </React.Fragment>
  );
};

export default Center;

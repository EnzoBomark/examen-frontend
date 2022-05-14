import * as React from 'react';
import * as S from '@racket-styles/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ProfileParamList } from '@racket-native/router/stacks/ProfileStack';
import { useCenter } from '@racket-traits/api/center';

type Props = DrawerScreenProps<ProfileParamList, 'Centers'>;

const Center: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const center = useCenter();

  return (
    <React.Fragment>
      <S.Scroll>
        <S.Screen headerHeight={headerHeight}>
          <S.Body>{center.data.name}</S.Body>
        </S.Screen>
      </S.Scroll>

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Clickable onPress={() => navigation.goBack()}>
            <S.Svg src="leftArrow" color="g1000" width="20px" />
          </S.Clickable>
        </S.Padding>
      </S.Header>
    </React.Fragment>
  );
};

export default Center;

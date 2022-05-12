import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ProfileParamList } from '@racket-native/router/stacks/ProfileStack';
import { useProfile } from '@racket-traits/api/profile';
import { Align } from '@racket-styles/native';

type Props = DrawerScreenProps<ProfileParamList, 'Settings'>;

const Settings: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const profile = useProfile();

  return (
    <React.Fragment>
      <S.Scroll>
        <S.AvoidKeyboard>
          <S.Screen headerHeight={headerHeight}>
            <S.Padding size="xs" vertical={false} flexBox={true}>
              <S.Spacer size="xs" />

              <Align type="center">
                <S.ProfilePicture
                  user={profile.data}
                  width="100px"
                  border="xxxl"
                />
              </Align>

              <S.Spacer size="xs" />

              <S.TextInput label placeholder={'Nickname'} />

              <S.Spacer size="xs" />

              <S.TextInput label placeholder={'Nickname'} />

              <S.Spacer size="s" />
            </S.Padding>
          </S.Screen>
        </S.AvoidKeyboard>
      </S.Scroll>

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Row justify="between">
            <S.Clickable onPress={() => navigation.goBack()}>
              <S.Svg src="leftArrow" width="20px" color="g1000" />
            </S.Clickable>
          </S.Row>
        </S.Padding>
      </S.Header>
    </React.Fragment>
  );
};

export default Settings;

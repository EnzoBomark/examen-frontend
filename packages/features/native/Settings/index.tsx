import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ProfileParamList } from '@racket-native/router/stacks/ProfileStack';
import { useProfile } from '@racket-traits/api/profile';
import { Align } from '@racket-styles/native';
import { Dimensions } from 'react-native';

const screen = Dimensions.get('screen');

type Props = DrawerScreenProps<ProfileParamList, 'Settings'>;

const Settings: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const profile = useProfile();
  const { data } = profile;

  const [name, setName] = React.useState(data.name);
  const [phone, setPhone] = React.useState(data.phone);
  const [skill, setSkill] = React.useState(data.skill);
  const [picture, setPicture] = React.useState(data.picture);
  const [birthDate, setBirthDate] = React.useState(data.birthDate);
  const [isRightHand, setIsRightHand] = React.useState(data.isRightHand);
  const [description, setDescription] = React.useState(data.description);

  return (
    <React.Fragment>
      <S.Scroll>
        <S.AvoidKeyboard>
          <S.Screen headerHeight={headerHeight}>
            <S.Padding size="xs" vertical={false} flexBox={true}>
              <S.Spacer size="m" />

              <Align type="center">
                <S.ProfilePicture
                  user={{ ...data, picture }}
                  width={`${screen.width / 3}px`}
                  border="xxxl"
                />
              </Align>

              <S.Spacer size="m" />

              <S.Radio
                label={'Is right handed'}
                active={isRightHand}
                toggle={setIsRightHand}
              />

              <S.Spacer size="xs" />

              <S.TextInput
                label
                placeholder={'Nickname'}
                value={name}
                onTextChange={setName}
              />

              <S.Spacer size="xs" />

              <S.TextArea
                label
                placeholder={'Bio'}
                value={description}
                onTextChange={setDescription}
              />

              <S.Spacer size="xs" />

              <S.TextInput
                label
                placeholder={'Phone'}
                value={phone}
                onTextChange={setPhone}
              />

              <S.Spacer size="xs" />

              <S.TextInput
                label
                placeholder={'Date of birth'}
                value={birthDate}
                onTextChange={setBirthDate}
              />

              <S.Spacer size="xs" />

              <S.TextInput
                label
                placeholder={'Rank'}
                value={skill}
                onTextChange={setSkill}
              />

              <S.Spacer size="xs" />

              <S.Fill />

              <S.Button label={'Save'} />

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

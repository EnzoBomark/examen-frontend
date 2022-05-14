import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import * as Hooks from '@racket-traits/hooks';
import criteria, { v } from '@racket-traits/validation';
import DatePicker from 'react-native-date-picker';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ProfileParamList } from '@racket-native/router/stacks/ProfileStack';
import { useProfile, useUpdateProfile } from '@racket-traits/api/profile';
import { Dimensions } from 'react-native';

const screen = Dimensions.get('screen');

type Props = DrawerScreenProps<ProfileParamList, 'Settings'>;

const Settings: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const profile = useProfile();
  const updateProfile = useUpdateProfile();

  const { data } = profile;
  const [name, setName] = React.useState(data.name);
  const [phone, setPhone] = React.useState(data.phone);
  const [skill, setSkill] = React.useState(data.skill);
  const [picture, setPicture] = React.useState(data.picture);
  const [birthDate, setBirthDate] = React.useState(data.birthDate);
  const [isRightHand, setIsRightHand] = React.useState(data.isRightHand);
  const [description, setDescription] = React.useState(data.description);

  const validate = criteria(
    new Map([
      [{ name }, [v.min(3), v.max(20), v.notEmpty]],
      [{ phone }, [v.isPhone, v.notEmpty]],
      [{ birthDate }, [v.birthDate]],
      [{ description }, [v.max(300)]],
    ]),
    true
  );

  Hooks.useUpdate(() => {
    if (!profile.isLoading) navigation.goBack();
  }, [profile]);

  return (
    <React.Fragment>
      <S.Scroll>
        <S.AvoidKeyboard>
          <S.Screen headerHeight={headerHeight}>
            <S.Padding size="xs" vertical={false} flexBox={true}>
              <S.Spacer size="m" />

              <S.Align type="center">
                <S.ProfilePicture
                  user={{ ...data, picture }}
                  width={`${screen.width / 3}px`}
                  border="xxxl"
                />
              </S.Align>

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
                error={validate({ name })}
              />

              <S.Spacer size="xs" />

              <S.TextArea
                label
                placeholder={'Bio'}
                value={description}
                onTextChange={setDescription}
                error={validate({ description })}
              />

              <S.Spacer size="xs" />

              <S.TextInput
                label
                placeholder={'Phone'}
                type="phone-pad"
                value={phone}
                onTextChange={setPhone}
                error={validate({ phone })}
              />

              <S.Spacer size="xs" />

              <S.Modal>
                <S.ModalOpenButton>
                  <S.Clickable>
                    <S.TextInput
                      static
                      placeholder={'Date of birth'}
                      value={
                        birthDate &&
                        new Date(birthDate)
                          .toLocaleDateString()
                          .split('-')
                          .reverse()
                          .join(' ')
                      }
                      error={validate({ birthDate })}
                    />
                  </S.Clickable>
                </S.ModalOpenButton>

                <S.ModalContents>
                  <S.Padding size="xs">
                    <S.Align type="center">
                      <DatePicker
                        mode="date"
                        date={new Date(birthDate || 0)}
                        onDateChange={(date) =>
                          setBirthDate(date.toISOString())
                        }
                      />
                    </S.Align>
                  </S.Padding>
                </S.ModalContents>
              </S.Modal>

              <S.Spacer size="xs" />

              <S.Modal>
                <S.ModalOpenButton>
                  <S.Clickable>
                    <S.TextInput
                      static
                      placeholder={'Rank'}
                      value={skill}
                      onTextChange={setSkill}
                    />
                  </S.Clickable>
                </S.ModalOpenButton>

                <S.ModalContents>
                  <S.Padding size="xs"></S.Padding>
                </S.ModalContents>
              </S.Modal>

              <S.Spacer size="xs" />

              <S.Fill />

              <S.Button
                label={'Save'}
                loading={profile.isLoading}
                onPress={() =>
                  updateProfile({ name, phone, birthDate, description })
                }
                disabled={
                  !!validate({
                    name,
                    phone,
                    birthDate,
                    description,
                  })?.length
                }
              />

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

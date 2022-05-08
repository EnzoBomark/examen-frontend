import * as React from 'react';
import * as S from '@racket-styles/native';
import validate, { v } from '@racket-traits/validation';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthParamList } from '@racket-native/router/stacks/AuthStack';
import { useCreateProfile } from '@racket-traits/api/profile';

type Props = StackScreenProps<AuthParamList, 'Register'>;

const Register: React.FC<Props> = ({ navigation, route }) => {
  const createProfile = useCreateProfile();
  const hasPassword = route.params;
  const [name, setName] = React.useState(route.params?.name || '');
  const [email, setEmail] = React.useState(route.params?.email || '');
  const [phone, setPhone] = React.useState(route.params?.phone || '');
  const [password, setPassword] = React.useState('');
  const [passwordRepet, setPasswordRepet] = React.useState('');

  const criteria = new Map([
    [{ name }, [v.min(3), v.max(20)]],
    [{ email }, [v.isEmail]],
    [{ phone }, [v.isPhone]],
    [{ password }, [v.min(8), v.max(30), v.upper, v.lower, v.digit]],
    [{ passwordRepet }, [v.match(password)]],
  ]);

  return (
    <S.AvoidKeyboard>
      <S.Screen>
        <S.Padding size="s">
          <S.Align type="start">
            <S.Clickable onPress={() => navigation.goBack()}>
              <S.Svg src="leftArrow" color="g1000" width="20px" />
            </S.Clickable>
          </S.Align>

          <S.Spacer size="xxs" />

          <S.H1 bold={true}>Register</S.H1>

          <S.Spacer size="xxs" />

          <S.Body color="g400">Please fill out all the fields</S.Body>
        </S.Padding>

        <S.Padding size="xs" vertical={false}>
          <S.TextInput
            error={validate(criteria, { name })}
            placeholder="Nickname"
            label={true}
            value={name}
            onTextChange={setName}
          />

          <S.Spacer size="xs" />

          <S.TextInput
            error={validate(criteria, { email })}
            placeholder="Email"
            label={true}
            type="email-address"
            value={email}
            onTextChange={setEmail}
          />

          <S.Spacer size="xs" />

          <S.TextInput
            error={validate(criteria, { phone })}
            placeholder="Phone number"
            label={true}
            type="phone-pad"
            value={phone}
            onTextChange={setPhone}
          />

          <S.Spacer size="xs" />

          {!hasPassword && (
            <React.Fragment>
              <S.TextInput
                error={validate(criteria, { password })}
                placeholder="Password"
                label={true}
                password={true}
                value={password}
                onTextChange={setPassword}
                icon="lock"
              />

              <S.Spacer size="xs" />

              <S.TextInput
                error={validate(criteria, { passwordRepet })}
                placeholder="Password repet"
                label={true}
                password={true}
                value={passwordRepet}
                onTextChange={setPasswordRepet}
                icon="lock"
              />

              <S.Spacer size="xs" />
            </React.Fragment>
          )}
        </S.Padding>

        <S.Spacer size="xs" />

        <S.Fill />

        <S.Padding size="xs" vertical={false}>
          <S.Button
            onPress={() => createProfile(name, email, phone, password)}
            label="Register account"
            disabled={
              !!validate(criteria, {
                name,
                email,
                phone,
                ...(!hasPassword && { password, passwordRepet }),
              })?.length
            }
          />
        </S.Padding>
      </S.Screen>
    </S.AvoidKeyboard>
  );
};

export default Register;

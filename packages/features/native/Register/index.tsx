import * as React from 'react';
import * as S from '@racket-styles/native';
import criteria, { v } from '@racket-traits/validation';
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

  const validate = criteria(
    new Map([
      [{ name }, [v.min(3), v.max(20)]],
      [{ email }, [v.isEmail]],
      [{ phone }, [v.isPhone]],
      [{ password }, [v.min(8), v.max(30), v.upper, v.lower, v.digit]],
      [{ passwordRepet }, [v.match(password)]],
    ])
  );

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

          <S.H1 bold>Register</S.H1>

          <S.Spacer size="xxs" />

          <S.Body color="g400">Please fill out all the fields</S.Body>
        </S.Padding>

        <S.Padding size="xs" vertical={false}>
          <S.TextInput
            label
            placeholder="Nickname"
            value={name}
            onTextChange={setName}
            error={validate({ name })}
          />

          <S.Spacer size="xs" />

          <S.TextInput
            label
            placeholder="Email"
            type="email-address"
            value={email}
            onTextChange={setEmail}
            error={validate({ email })}
          />

          <S.Spacer size="xs" />

          <S.TextInput
            label
            placeholder="Phone number"
            type="phone-pad"
            value={phone}
            onTextChange={setPhone}
            error={validate({ phone })}
          />

          <S.Spacer size="xs" />

          {!hasPassword && (
            <React.Fragment>
              <S.TextInput
                label
                password
                placeholder="Password"
                value={password}
                onTextChange={setPassword}
                error={validate({ password })}
                icon="lock"
              />

              <S.Spacer size="xs" />

              <S.TextInput
                label
                password
                placeholder="Password repet"
                value={passwordRepet}
                onTextChange={setPasswordRepet}
                error={validate({ passwordRepet })}
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
              !!validate({
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

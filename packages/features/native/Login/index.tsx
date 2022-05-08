import * as React from 'react';
import * as S from '@racket-styles/native';
import { loginWithFacebook } from '@racket-traits/auth/facebook';
import { loginWithGoogle } from '@racket-traits/auth/google';
import { loginWithApple } from '@racket-traits/auth/apple';
import { useEvaluateLogin } from '@racket-traits/auth';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthParamList } from '@racket-native/router/stacks/AuthStack';
import { useEmailLogin } from '@racket-traits/auth/hooks/useEmailLogin';

type Props = StackScreenProps<AuthParamList, 'Login'>;

const Login: React.FC<Props> = ({ navigation }) => {
  const evaluateLogin = useEvaluateLogin();
  const emailLogin = useEmailLogin();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);

  return (
    <S.AvoidKeyboard>
      <S.Screen>
        <S.Spacer size="xs" />

        <S.Padding size="s">
          <S.H1 bold={true}>Welcome Back!</S.H1>

          <S.Spacer size="xxs" />

          <S.Body color="g500">
            Long time no see! Let’s login to get started
          </S.Body>
        </S.Padding>

        <S.Padding size="xs" vertical={false}>
          <S.TextInput
            placeholder="Email"
            label={true}
            type="email-address"
            value={email}
            onTextChange={setEmail}
          />

          <S.Spacer size="xs" />

          <S.TextInput
            placeholder="Password"
            label={true}
            password={true}
            value={password}
            onTextChange={setPassword}
            icon="lock"
          />

          <S.Spacer size="xs" />

          <S.Row align="center">
            <S.Checkbox
              label="Remember"
              invert={true}
              active={remember}
              toggle={setRemember}
              disabled={true}
            />

            <S.Fill />

            <S.Clickable disabled={true}>
              <S.Body color="p600">Forgot Password</S.Body>
            </S.Clickable>
            <S.Spacer size="xs" />
          </S.Row>
        </S.Padding>
        <S.Spacer size="xs" />

        <S.Fill />

        <S.Padding size="xs" vertical={false}>
          <S.OutlineButton
            label="Login"
            color="g500"
            background="g200"
            height="46px"
            onPress={() => emailLogin(email, password)}
          />

          <S.Spacer size="xs" />

          <S.Button
            onPress={() => evaluateLogin(loginWithGoogle)}
            label="Continue with Google"
            icon="google"
            color="g500"
            background="g100"
            height="46px"
          />

          <S.Spacer size="xs" />

          <S.Button
            onPress={() => evaluateLogin(loginWithFacebook)}
            label="Continue with Facebook"
            icon="facebook"
            height="46px"
          />

          <S.Spacer size="xs" />

          <S.Button
            onPress={() => evaluateLogin(loginWithApple)}
            label="Continue with Apple"
            icon="apple"
            color="g0"
            background="g1000"
            height="46px"
            disabled={true}
          />
          <S.Spacer size="m" />
          <S.Align type="center">
            <S.Row align="center">
              <S.Body color="g500">Dont have an account?</S.Body>
              <S.Spacer size="xxs" />

              <S.Clickable onPress={() => navigation.navigate('Register')}>
                <S.Body bold={true} color="g1000">
                  Sign up for free
                </S.Body>
              </S.Clickable>
            </S.Row>
          </S.Align>
        </S.Padding>
      </S.Screen>
    </S.AvoidKeyboard>
  );
};

export default Login;

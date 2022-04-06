import * as React from 'react';
import * as Native from 'react-native';
import * as S from '@racket-styles/native';

const Login: React.FC = () => {
  const [remember, setRemember] = React.useState(false);

  return (
    <S.Screen bottom={true} top={true}>
      <S.Spacer size="xs" />

      <S.Padding size="s">
        <S.H1 bold={true}>Welcome Back!</S.H1>

        <S.Spacer size="xxs" />

        <S.Body color="g400">
          Long time no see! Let’s login to get started
        </S.Body>
      </S.Padding>

      <S.Padding size="xs" vertical={false}>
        <S.TextInput placeholder="Enter your Email" />

        <S.Spacer size="xs" />

        <S.TextInput placeholder="Password" password={true} />

        <S.Spacer size="xs" />

        <S.Row align="center">
          <S.Checkbox
            label="Remember"
            invert={true}
            active={remember}
            toggle={setRemember}
          />

          <S.Fill />

          <S.Clickable>
            <S.Body color="p600">Forgot Password</S.Body>
          </S.Clickable>
          <S.Spacer size="xs" />
        </S.Row>
      </S.Padding>

      <S.Fill />

      <S.Padding size="xs" vertical={false}>
        <S.OutlineButton
          label="Login"
          color="g500"
          background="g200"
          height="46px"
        />

        <S.Spacer size="xs" />

        <S.Button
          label="Continue with Google"
          icon="google"
          color="g500"
          background="g100"
          height="46px"
        />

        <S.Spacer size="xs" />

        <S.Button
          label="Continue with Facebook"
          icon="facebook"
          height="46px"
        />

        <S.Spacer size="xs" />

        <S.Button
          label="Continue with Apple"
          icon="apple"
          color="g0"
          background="g1000"
          height="46px"
        />
        <S.Spacer size="m" />
        <S.Align type="center">
          <S.Row align="center">
            <S.Body color="g500">Dont have an account?</S.Body>
            <S.Spacer size="xxs" />

            <S.Clickable>
              <S.Body bold={true} color="g1000">
                Sign up for free
              </S.Body>

              <Native.View style={{ position: 'absolute', left: -5, top: 15 }}>
                <S.Image src="underline" width="120px" height="30px" />
              </Native.View>
            </S.Clickable>
          </S.Row>
        </S.Align>
        <S.Spacer size="m" />
      </S.Padding>
    </S.Screen>
  );
};

export default Login;

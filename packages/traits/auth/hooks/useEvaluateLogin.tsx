import * as React from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useFetchProfile, useProfile } from '@racket-traits/api/profile';
import { AuthParamList } from '@racket-native/router/stacks/AuthStack';

type Navigation = StackNavigationProp<AuthParamList, 'Login'>;

type RegisterProps = { name?: string; email?: string; phone?: string };

export const useEvaluateLogin = () => {
  const navigation = useNavigation<Navigation>();
  const [registerProps, setRegisterProps] = React.useState<RegisterProps>();
  const fetchProfile = useFetchProfile();
  const profile = useProfile();

  React.useEffect(() => {
    if (profile.hasError) navigation.navigate('Register', registerProps);
  }, [profile]);

  const evaluateLogin = async (
    fn: () => Promise<FirebaseAuthTypes.UserCredential | undefined>
  ) => {
    const data = await fn();

    if (!data) return;

    setRegisterProps({
      name: data.user.displayName || undefined,
      email: data.user.email || undefined,
      phone: data.user.phoneNumber || undefined,
    });

    fetchProfile();
  };

  return evaluateLogin;
};

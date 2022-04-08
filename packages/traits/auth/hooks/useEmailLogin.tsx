import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useGetProfile } from '@racket-traits/api/profile';

export const useEmailLogin = () => {
  const getProfile = useGetProfile();

  const emailLogin = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);

      getProfile();
    } catch (err) {
      const message = (err as Error).message;

      Alert.alert('Failed to login', message.slice(message.indexOf(' ') + 1));
    }
  };
  return emailLogin;
};

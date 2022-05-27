import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useFetchProfile } from '@racket-traits/api/profile';

export const useEmailLogin = () => {
  const fetchProfile = useFetchProfile();

  const emailLogin = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);

      fetchProfile();
    } catch (err) {
      const message = (err as Error).message;

      Alert.alert('Failed to login', message.slice(message.indexOf(' ') + 1));
    }
  };
  return emailLogin;
};

import { Alert } from 'react-native';
import axios from 'axios';
import api from '../../index';
import { Profile } from '../types';
import { fail, pending, success } from '../actions';
import auth from '@react-native-firebase/auth';
import Redux from '../store';

export const usePostProfile = () => {
  const dispatch = Redux.useDispatch();

  const postProfile = async (
    name: string,
    email: string,
    phone: string,
    password?: string
  ) => {
    dispatch(pending());

    try {
      if (password)
        await auth().createUserWithEmailAndPassword(email, password);

      const res = await api.post<Profile>(`profile`, { name, email, phone });

      dispatch(success(res.data));
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        const message = (err as Error).message;

        Alert.alert(
          'Failed to create account',
          message.slice(message.indexOf(' ') + 1)
        );
      }

      if (axios.isAxiosError(err)) {
        Alert.alert(
          'Failed to create account',
          'Something went wrong, try again or contact support'
        );

        auth().currentUser?.delete();

        dispatch(fail(err.response?.data));
      }
    }
  };
  return postProfile;
};

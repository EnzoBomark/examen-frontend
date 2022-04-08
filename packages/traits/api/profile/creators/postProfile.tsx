import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import api, { AxiosError } from '../../index';
import store from '../store';
import { Profile } from '../types';
import { fail, pending, success } from '../actions';

export const usePostProfile = () => {
  const dispatch = store.useDispatch();

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

      api
        .post<Profile>(`profile`, { name, email, phone })
        .then((res) => dispatch(success(res.data)))
        .catch((err: AxiosError<ResponseError<Profile>>) => {
          if (!err.response) throw err;

          Alert.alert(
            'Failed to create account',
            'Something went wrong, try again or contact support'
          );

          auth().currentUser?.delete();
          dispatch(fail(err.response.data));
        });
    } catch (err) {
      const message = (err as Error).message;

      Alert.alert(
        'Failed to create account',
        message.slice(message.indexOf(' ') + 1)
      );
    }
  };
  return postProfile;
};

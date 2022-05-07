import { Alert } from 'react-native';
import { fail, pending, success } from '../actions';
import auth from '@react-native-firebase/auth';
import api, { AxiosError } from '../../index';
import store from '../store';

export const useCreateProfile = () => {
  const dispatch = store.useDispatch();

  const createProfile = async (
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
        .post<User>(`profile`, { name, email, phone })
        .then((res) => dispatch(success(res.data)))
        .catch(async (err: AxiosError<ResponseError<User>>) => {
          await auth().currentUser?.delete();

          if (!err.response) throw err;

          Alert.alert(
            'Failed to create account',
            'Something went wrong, try again or contact support'
          );

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
  return createProfile;
};

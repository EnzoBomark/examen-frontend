import { Alert } from 'react-native';
import api, { AxiosError } from '../../../index';
import store from '../store';
import { fail, pending, success } from '../actions';

export const usePostMatch = () => {
  const dispatch = store.useDispatch();

  const postMatch = async () => {
    dispatch(pending());

    api
      .post<Match>(`match`)
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError<Match>>) => {
        if (!err.response) throw err;

        Alert.alert(
          'Failed to create match',
          'Something went wrong, try again or contact support'
        );

        console.log(err.response.data);
        dispatch(fail(err.response.data));
      });
  };
  return postMatch;
};

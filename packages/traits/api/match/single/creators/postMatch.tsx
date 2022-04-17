import { Alert } from 'react-native';
import api, { AxiosError } from '../../../index';
import store from '../store';
import { fail, pending, success } from '../actions';

export const usePostMatch = () => {
  const dispatch = store.useDispatch();

  const postMatch = async (
    type: boolean,
    isBooked: boolean,
    isPublic: boolean,
    center: string,
    dateTime: string,
    duration: string,
    court: string,
    price: string,
    currency: string,
    phone: string
  ) => {
    dispatch(pending());

    api
      .post<Match>(`match`, {
        type: type ? 'single' : 'double',
        isBooked,
        isPublic,
        dateTime,
        duration,
        currency,
        centerId: center,
        court: court.length ? court : undefined,
        price: price.length ? price : undefined,
        phone: phone.length ? phone : undefined,
      })
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

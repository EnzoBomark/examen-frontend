import api, { AxiosError } from '../../../axios';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useUpdateMatch = () => {
  const dispatch = store.useDispatch();

  const updateMatch = (
    match: Match,
    isBooked?: boolean,
    isPublic?: boolean,
    dateTime?: string,
    duration?: string,
    currency?: string,
    description?: string,
    center?: string,
    court?: string,
    price?: string,
    phone?: string
  ) => {
    dispatch(pending());

    return api
      .put<Match>(`match/${match.id}`, {
        isBooked,
        isPublic,
        dateTime,
        duration,
        currency,
        description,
        centerId: center,
        court: court?.length ? court : undefined,
        price: price?.length ? price : undefined,
        phone: phone?.length ? phone : undefined,
      })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };

  return updateMatch;
};

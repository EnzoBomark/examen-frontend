import api, { AxiosError } from '../../../../axios';
import { fail, pending, success } from '../actions';
import store from '../store';
import { useCountCenters } from './countCenters';

export const useFetchCenters = () => {
  const dispatch = store.useDispatch();
  const countCenters = useCountCenters();

  const fetchCenters = (user: User, page: number) => {
    dispatch(pending());

    api
      .get<Center[]>(`user/${user.id}/centers`, { params: { page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });

    countCenters(user);
  };
  return fetchCenters;
};

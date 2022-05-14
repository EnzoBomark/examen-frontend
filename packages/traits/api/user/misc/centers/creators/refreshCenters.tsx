import api, { AxiosError } from '../../../../axios';
import { fail, pending, refresh } from '../actions';
import store from '../store';
import { useCountCenters } from './countCenters';

export const useRefreshCenters = () => {
  const dispatch = store.useDispatch();
  const countCenters = useCountCenters();

  const refreshCenters = (user: User) => {
    dispatch(pending());

    api
      .get<Center[]>(`user/${user.id}/centers`, { params: { page: 0 } })
      .then((res) => dispatch(refresh(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });

    countCenters(user);
  };
  return refreshCenters;
};

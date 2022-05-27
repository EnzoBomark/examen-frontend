import api, { AxiosError } from '../../../../axios';
import { count, fail } from '../actions';
import store from '../store';

export const useCountCenters = () => {
  const dispatch = store.useDispatch();

  const countCenters = (user: User) => {
    api
      .get<{ count: number }>(`user/${user.id}/centers/count`)
      .then((res) => dispatch(count(res.data.count)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return countCenters;
};

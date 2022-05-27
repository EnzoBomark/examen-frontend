import api, { AxiosError } from '../../../../axios';
import { count, fail } from '../actions';
import store from '../store';

export const useCountFollowers = () => {
  const dispatch = store.useDispatch();

  const countFollowers = (user: User) => {
    api
      .get<{ count: number }>(`user/${user.id}/followers/count`)
      .then((res) => dispatch(count(res.data.count)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };

  return countFollowers;
};

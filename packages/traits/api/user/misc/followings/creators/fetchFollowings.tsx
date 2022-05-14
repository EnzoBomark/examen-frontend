import api, { AxiosError } from '../../../../axios';
import { count, fail, pending, success } from '../actions';
import store from '../store';
import { useCountFollowings } from './countFollowings';

export const useFetchFollowings = () => {
  const dispatch = store.useDispatch();
  const countFollowings = useCountFollowings();

  const fetchFollowings = (user: User, page: number) => {
    dispatch(pending());

    api
      .get<User[]>(`user/${user.id}/followings`, { params: { page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });

    countFollowings(user);
  };
  return fetchFollowings;
};

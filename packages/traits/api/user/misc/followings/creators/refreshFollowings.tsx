import api, { AxiosError } from '../../../../axios';
import { fail, pending, refresh } from '../actions';
import store from '../store';
import { useCountFollowings } from './countFollowings';

export const useRefreshFollowings = () => {
  const dispatch = store.useDispatch();
  const countFollowings = useCountFollowings();

  const refreshFollowings = (user: User) => {
    dispatch(pending());

    api
      .get<User[]>(`user/${user.id}/followings`, { params: { page: 0 } })
      .then((res) => dispatch(refresh(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });

    countFollowings(user);
  };
  return refreshFollowings;
};

import api, { AxiosError } from '../../../../axios';
import { fail, pending, refresh } from '../actions';
import store from '../store';

export const useRefreshFollowers = () => {
  const dispatch = store.useDispatch();

  const refreshFollowers = (user: User) => {
    dispatch(pending());

    api
      .get<User[]>(`user/${user.id}/followers`, { params: { page: 0 } })
      .then((res) => dispatch(refresh(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return refreshFollowers;
};

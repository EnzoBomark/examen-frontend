import api, { AxiosError } from '../../../../axios';
import { fail, pending, success } from '../actions';
import store from '../store';
import { useCountFollowers } from './countFollowers';

export const useFetchFollowers = () => {
  const dispatch = store.useDispatch();
  const countFollowers = useCountFollowers();

  const fetchFollowers = (user: User, page: number) => {
    dispatch(pending());

    api
      .get<User[]>(`user/${user.id}/followers`, { params: { page } })
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });

    countFollowers(user);
  };
  return fetchFollowers;
};

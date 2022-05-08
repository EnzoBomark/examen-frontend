import api, { AxiosError } from '../../../index';
import { useSetFollow } from '../../multiple';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useFollowUser = () => {
  const dispatch = store.useDispatch();
  const setFollow = useSetFollow();
  const followUser = (user: User) => {
    dispatch(pending());

    api
      .put<User>(`profile/follow/${user.id}`)
      .then((res) => {
        setFollow(user);
        dispatch(success(res.data));
      })
      .catch((err: AxiosError<ResponseError<Chat>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return followUser;
};

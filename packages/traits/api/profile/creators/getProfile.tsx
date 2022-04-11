import api, { AxiosError } from '../../index';
import store from '../store';
import { fail, pending, success } from '../actions';

export const useGetProfile = () => {
  const dispatch = store.useDispatch();

  const getProfile = () => {
    dispatch(pending());

    api
      .get<User>(`profile`)
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError<User>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return getProfile;
};

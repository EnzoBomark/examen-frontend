import api, { AxiosError } from '../../index';
import { fail, pending, success } from '../actions';

import store from '../store';

export const useUpdateProfile = () => {
  const dispatch = store.useDispatch();

  const updateProfile = (data: Partial<User>) => {
    dispatch(pending());

    return api
      .put<User>(`profile`, data)
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };

  return updateProfile;
};

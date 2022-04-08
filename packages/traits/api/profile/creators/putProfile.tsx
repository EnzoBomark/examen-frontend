import api, { AxiosError } from '../../index';
import { fail, pending, success } from '../actions';
import { Profile } from '../types';
import store from '../store';

export const usePutProfile = () => {
  const dispatch = store.useDispatch();

  const putProfile = (data: Partial<Profile>) => {
    dispatch(pending());

    return api
      .put<Profile>(`profile`, data)
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };

  return putProfile;
};

import api, { AxiosError } from '../../index';
import { fail, pending, success } from '../actions';
import { Profile } from '../types';
import Redux from '../store';

export const usePutProfile = () => {
  const dispatch = Redux.useDispatch();

  const putProfile = (data: Partial<Profile>) => {
    dispatch(pending());

    return api
      .put<Profile>(`profile`, data)
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError) => {
        if (err.response) dispatch(fail(err.response));
      });
  };

  return putProfile;
};

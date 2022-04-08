import api, { AxiosError } from '../../index';
import { Profile, ResponseError } from '../types';
import { fail, pending, success } from '../actions';
import Redux from '../store';

export const useGetProfile = () => {
  const dispatch = Redux.useDispatch();

  const getProfile = () => {
    dispatch(pending());

    api
      .get<Profile>(`profile`)
      .then((res) => dispatch(success(res.data)))
      .catch((err: AxiosError<ResponseError>) => {
        if (err.response) {
          dispatch(fail(err.response.data));
        }
      });
  };
  return getProfile;
};

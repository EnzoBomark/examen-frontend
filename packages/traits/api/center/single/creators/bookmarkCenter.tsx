import api, { AxiosError } from '../../../axios';
import { useSetBookmark } from '../../multiple';
import { fail, pending, success } from '../actions';
import store from '../store';

export const useBookmarkCenter = () => {
  const dispatch = store.useDispatch();
  const setFollow = useSetBookmark();

  const bookmarkCenter = (center: Center) => {
    dispatch(pending());

    api
      .put<Center>(`profile/center/${center.id}`)
      .then((res) => {
        setFollow(center);
        dispatch(success(res.data));
      })
      .catch((err: AxiosError<ResponseError<Chat>>) => {
        if (!err.response) throw err;
        dispatch(fail(err.response.data));
      });
  };
  return bookmarkCenter;
};

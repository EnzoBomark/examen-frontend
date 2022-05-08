import { updateReadStatus } from '../actions';
import store from '../store';

export const useSetReadStatus = () => {
  const dispatch = store.useDispatch();

  const setReadStatus = (readStatus: ReadStatus[], chat: Chat) => {
    dispatch(updateReadStatus(readStatus, chat));
  };
  return setReadStatus;
};
